const { db } = require('../util/admin');

const DbSlots = db.collection('slots')

exports.getAllSlots = (req, res) => {
  DbSlots
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let slots = [];
      data.forEach(doc => {
        slots.push({
          slotId: doc.id,
          course: doc.data().course,
          timeframe: doc.data().timeframe,
          type: doc.data().type,
          matric: doc.data().matric,
          createdAt: doc.data().createdAt
        });
      });
      return res.json(slots);
    })
    .catch((err) => console.error(err));
}

exports.makeASlot = (req, res) => {
  const newSlot = {
    course: req.body.course,
    timeframe: req.body.timeframe,
    type: req.body.type,
    userType: req.body.userType,
    matric: req.user.matric,
    createdAt: new Date().toISOString()
  }
  DbSlots
    .add(newSlot)
    .then(doc => {
      res.json({message: `document ${doc.id} created successfully`});
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong'});
      console.error(err);
    });
}