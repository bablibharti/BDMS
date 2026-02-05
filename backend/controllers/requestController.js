const BloodRequest = require("../models/BloodRequest");

exports.createRequest = async (req, res) => {
  const { patientName, bloodGroup, unitsNeeded, city, hospital } = req.body;

  const request = await BloodRequest.create({
    patientName,
    bloodGroup,
    unitsNeeded,
    city,
    hospital,
    requestedBy: req.user.id
  });

  res.status(201).json(request);
};

exports.getMyRequests = async (req, res) => {
  const requests = await BloodRequest.find({
    requestedBy: req.user.id
  }).sort({ createdAt: -1 });

  res.json(requests);
};


exports.getAllRequests = async (req, res) => {
  const requests = await BloodRequest.find().populate("requestedBy", "name");
  res.json(requests);
};
