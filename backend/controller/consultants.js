const Consultants = require("../model/consultants");
exports.getConsultants = (req, res, next) => {
  const serviceId = req.params.cid;
  Consultants.find({ service: serviceId })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((err) => console.log(err));
};
