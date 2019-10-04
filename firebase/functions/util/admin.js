const admin = require("firebase-admin");

var serviceAccount = require("./firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rakuentuor.firebaseio.com"
});

const db = admin.firestore()

module.exports = { admin, db }