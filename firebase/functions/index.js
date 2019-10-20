const functions = require("firebase-functions");
const app = require('express')();
const cors = require('cors');
app.use(cors());

const authMiddleware = require('./util/authMiddleware');

const { getAllSlots, makeASlot } = require("./handlers/slots");
const { signup, login, uploadTimetable } = require("./handlers/users");

// Donations route
app.get('/slots', getAllSlots);
app.post('/makeslot', authMiddleware, makeASlot);

// Users route
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/timetable', authMiddleware, uploadTimetable);

// exports.getDonations = functions.https.onRequest((req, res) => { });
// https://baseurl.com/api/_____
exports.api = functions.region("asia-east2").https.onRequest(app);
