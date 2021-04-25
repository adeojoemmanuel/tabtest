module.exports = (app) => {
  const tabs = require("../controllers/tabs.controller.js");

  // Create a new Note
  app.post("/tabs", tabs.create);

  // Retrieve all tabs
  app.get("/tabs", tabs.findAll);

  // Retrieve a single Note with noteId
  app.get("/tabs/:tabId", tabs.findOne);

  // Update a Note with noteId
  app.put("/tabs/:tabId", tabs.update);

  // Delete a Note with noteId
  app.delete("/tabs/:tabId", tabs.delete);

  // Retrieve all tabs
  app.get("/tabstats", tabs.Stats);
};
