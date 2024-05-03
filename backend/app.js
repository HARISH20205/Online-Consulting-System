const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const serviceRoutes = require("./routes/Services");
const consultantsRoutes = require("./routes/Consultants");
const userRoutes = require("./routes/User");
const User = require("./model/user");
const authRoutes = require("./routes/Auth");
const Consultants = require("./model/consultants");
const MongoDBStore = require("connect-mongodb-session")(session);
app.use(bodyParser.json());
const store = new MongoDBStore({
  uri: "mongodb+srv://HARISH20205:c68NXP0HQ56lrVru@cluster0.8x5hejk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  collection: "sessions",
});
app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.post("/", (req, res, next) => {
  const sessionId = req.body.sessionId;
  store.get(sessionId, (err, sessionData) => {
    if (err) {
      return;
    }
    if (sessionData) {
      const userId = sessionData.user._id;
      User.findOne({ _id: userId })
        .then((user) => {
          if (!user) {
            return res
              .status(400)
              .json({ message: "Invalid email or password" });
          }
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
                if (err) {
                  console.error("Error saving session:", err);
                  return res.status(500).send("Internal Server Error");
                }
                res.json({
                  user: user,
                  consultationDetails: consultationDetails,
                  sessionId: req.session.id,
                });
              })
              .catch((err) => {
                console.error("Error fetching consultant details:", err);
                return res.status(500).send("Internal Server Error");
              });
          } else {
            res.json({
              user: user,
              consultationDetails: [],
              sessionId: req.session.id,
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      res.status(500).send({ message: "No current session found!" });
    }
  });
});
app.use(serviceRoutes);
app.use(authRoutes);
app.use(consultantsRoutes);
app.use(userRoutes);
mongoose
  .connect(
    "mongodb+srv://HARISH20205:c68NXP0HQ56lrVru@cluster0.8x5hejk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
  .then(() => {
    console.log("connected!");
    app.listen(8080);
  })
  .catch((err) => console.log(err));
