const { admin, db } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp(config);

const {
  validateSignupData,
  validateLoginData
} = require('../util/validators');

// Sign users up
exports.signup = (req, res) => {
  const newUser = {
    matric: req.body.matric,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  const { valid, errors } = validateSignupData(newUser);

  if (!valid) return res.status(400).json(errors);

  let token, userId;
  db.doc(`/users/${newUser.matric}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ matric: 'this matric is already taken' });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        matric: newUser.matric,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      };
      return db.doc(`/users/${newUser.matric}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already is use' });
      } else {
        return res
          .status(500).json({ general: 'Something went wrong, please try again' });
      }
    });
};
// Log user in
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      // auth/wrong-password
      // auth/user-not-user
      return res
        .status(403)
        .json({ general: 'Wrong credentials, please try again' });
    });
};

exports.scanTimetable = (req, res) => {
  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');
  const unirest = require('unirest');

  const busboy = new BusBoy({ headers: req.headers });

  let filepath = "";

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res.status(400).json({ error: 'Wrong file type submitted' });
    }
    filepath = path.join(os.tmpdir(), filename);
    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on('finish', function() {
    unirest.post('https://microsoft-azure-microsoft-computer-vision-v1.p.rapidapi.com/ocr')
    .headers({
        "X-RapidAPI-Host": "microsoft-azure-microsoft-computer-vision-v1.p.rapidapi.com",
        "X-RapidAPI-Key": config.RapidAPIKey,
        'Content-Type': 'multipart/form-data'
    }).attach('file', filepath) // Attachment
    .then(response => {
      return res.status(200).json(response.body);
    }).catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });;
  });
  busboy.end(req.rawBody);
};

// exports.uploadTimetable = (req, res) => {
//   const BusBoy = require('busboy');
//   const path = require('path');
//   const os = require('os');
//   const fs = require('fs');

//   const busboy = new BusBoy({ headers: req.headers });

//   let imageFileName;
//   let imageToBeUploaded = {};

//   busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
//     if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
//       return res.status(400).json({ error: 'Wrong file type submitted' });
//     }
//     // my.image.png
//     const imageExtension = filename.split('.')[filename.split('.').length - 1];
//     // timetable-139588618986.png
//     imageFileName = `timetable-${Math.round( Math.random() * Date.now() )}.${imageExtension}`;
//     //tmpdir because we're working with functions, not an actual server
//     const filepath = path.join(os.tmpdir(), imageFileName);
//     imageToBeUploaded = { filepath, mimetype };
//     file.pipe(fs.createWriteStream(filepath));
//   });
//   busboy.on('finish', () => {
//     admin
//       .storage()
//       .bucket()
//       .upload(imageToBeUploaded.filepath, {
//         resumable: false,
//         metadata: {
//           metadata: {
//             contentType: imageToBeUploaded.mimetype
//           }
//         }
//       })
//       .then(() => {
//         const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
//         return db.doc(`/users/${req.user.matric}`).update({ imageUrl });
//       })
//       .then(() => {
//         return res.json({ message: 'Image uploaded successfully' });
//       }).then(() => {

//       }).catch((err) => {
//         console.error(err);
//         return res.status(500).json({ error: err.code });
//       });
//   });
//   busboy.end(req.rawBody);
// };