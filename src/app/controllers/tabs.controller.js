const Tab = require("../models/tabs.model.js");
// const toPaginate = require("../../helper/toPaginate");

// Create and Save a new Tab
exports.create = (req, res) => {
  // Validate request
  //   if (!req.body.content) {
  //     return res.status(400).send({
  //       message: "Tab content can not be empty",
  //     });
  //   }

  // Create a Tab
  const tab = new Tab({
    name: req.body.name,
    description: req.body.description,
    dataPoints: req.body.dataPoints,
  });

  // Save Tab in the database
  tab
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Tab.",
      });
    });
};

// Retrieve and return all tabs from the database.
exports.findAll = (req, res) => {
  Tab.find()
    .then((tabs) => {
      res.send(tabs);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tabs.",
      });
    });
};

// Find a single tab with a tabId
exports.findOne = (req, res) => {
  Tab.findById(req.params.tabId)
    .then((tab) => {
      if (!tab) {
        return res.status(404).send({
          message: "Tab not found with id " + req.params.tabId,
        });
      }
      res.send(tab);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Tab not found with id " + req.params.tabId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving tab with id " + req.params.tabId,
      });
    });
};

// Update a tab identified by the tabId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Tab content can not be empty",
    });
  }

  // Find tab and update it with the request body
  Tab.findByIdAndUpdate(
    req.params.tabId,
    {
      name: req.body.name,
      description: req.body.description,
      dataPoints: req.body.dataPoints,
    },
    { new: true }
  )
    .then((tab) => {
      if (!tab) {
        return res.status(404).send({
          message: "Tab not found with id " + req.params.tabId,
        });
      }
      res.send(tab);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Tab not found with id " + req.params.tabId,
        });
      }
      return res.status(500).send({
        message: "Error updating tab with id " + req.params.tabId,
      });
    });
};

// Delete a tab with the specified tabId in the request
exports.delete = (req, res) => {
  Tab.findByIdAndRemove(req.params.tabId)
    .then((tab) => {
      if (!tab) {
        return res.status(404).send({
          message: "Tab not found with id " + req.params.tabId,
        });
      }
      res.send({ message: "Tab deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Tab not found with id " + req.params.tabId,
        });
      }
      return res.status(500).send({
        message: "Could not delete tab with id " + req.params.tabId,
      });
    });
};

// Find a single tab with a tabId
exports.Stats = (req, res) => {
  Tab.find()
    .then((tabs) => {
      const tabsdata = tabs.map((x) => {
        return { _id: x.id, datapointCount: x.dataPoints.length };
      });
      res.send(tabsdata);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tabs.",
      });
    });
};
