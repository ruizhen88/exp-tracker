var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: { type: String, required: true },
  img_url: String,
  expiration_date: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false },
});

module.exports = mongoose.model("product", productSchema);
