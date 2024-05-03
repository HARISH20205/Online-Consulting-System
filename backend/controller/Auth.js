const User = require("../model/user");
const Consultants = require("../model/consultants");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: "mongodb+srv://HARISH20205:c68NXP0HQ56lrVru@cluster0.8x5hejk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  collection: "sessions",
});
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email, password: password })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      req.session.user = user;
      const existingArray = user.consultationsWith;
      let promises = [];

      if (user.consultationsWith.length > 0) {
        for (let i = 0; i < existingArray.length; i++) {
          const promise = Consultants.findOne({
            _id: existingArray[i].consultantId,
          })
            .then((consultant) => {
              return {
                name: consultant.name,
                date: existingArray[i].date,
              };
            })
            .catch((err) => console.log(err));

          promises.push(promise);
        }

        Promise.all(promises)
          .then((consultationDetails) => {
            req.session.save((err) => {
              if (err) {
                console.error("Error saving session:", err);
                return res.status(500).send("Internal Server Error");
              }
              console.log(req.session.id);
              res.json({
                user: user,
                consultationDetails: consultationDetails,
                sessionId: req.session.id,
                message: "Login Successfull",
              });
            });
          })
          .catch((err) => {
            console.error("Error fetching consultant details:", err);
            return res.status(500).send("Internal Server Error");
          });
      } else {
        req.session.save((err) => {
          if (err) {
            console.error("Error saving session:", err);
            return res.status(500).send("Internal Server Error");
          }
          console.log(req.session.id);
          res.json({
            user: user,
            consultationDetails: [],
            sessionId: req.session.id,
            message: "Login Successfull",
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    });
};

exports.postLogout = (req, res, next) => {
  const sessionId = req.body.sessionId;
  store.destroy(sessionId, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ message: "logout successfull" });
    }
  });
};
exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.userName;
  User.findOne({ email: email })
    .then((userData) => {
      if (userData) {
        return res
          .status(201)
          .send({ message: "Account Already Exist!Login To Continue" });
      }
      const user = new User({ name: name, email: email, password: password });
      user.save().then(() => {
        res.status(200).send({ message: "Account Created Successfully" });
      });
    })
    .catch((err) => console.log(err));
};
