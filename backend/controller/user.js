const User = require("../model/user");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: "mongodb+srv://HARISH20205:c68NXP0HQ56lrVru@cluster0.8x5hejk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  collection: "sessions",
});
exports.postAppointConsult = (req, res, next) => {
  const cid = req.body.consultantId;
  const sessionId = req.body.sessionId;
  const date = req.body.date;
  store.get(sessionId, (err, session) => {
    if (err) {
      return;
    }
    if (session) {
      const userId = session.user._id;
      User.findOne({ _id: userId })
        .then((user) => {
          const existingConsultations = user.consultationsWith;
          const newObj = { consultantId: cid, date: date };
          existingConsultations.push(newObj);
          user.consultationsWith = existingConsultations;
          user.save().then(() => {
            res.json({ message: "Booked!" });
          });
        })
        .catch((err) => console.log(err));
    } else {
      res.status(500).send({ message: "No current session found!" });
    }
  });
};
