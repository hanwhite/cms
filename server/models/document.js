var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String },
    url: { type: String },
});

module.exports = mongoose.model("Document", documentSchema); 