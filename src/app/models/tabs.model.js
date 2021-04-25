const mongoose = require("mongoose");

const TabSchema = mongoose.Schema({
  name: String,
  description: String,
  dataPoints: [
    {
      dataType: {
        type: String,
        enum: ["selection", "text", "number", "date"],
      },
      label: String,
      description: String,
      options: [String],
      placeholder: String,
    },
  ],
});

module.exports = mongoose.model("Tab", TabSchema);
