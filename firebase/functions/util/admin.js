const admin = require("firebase-admin");

var serviceAccount = require("./firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ntucheduler.firebaseio.com"
});

const db = admin.firestore()

module.exports = { admin, db }