const Services = require("../model/services");
exports.getServices = (req, res, next) => {
  Services.find()
    .then((data) => {
      res.status(200).json({ message: "Data got successfully", data: data });
    })
    .catch((err) => console.log(err));
};
