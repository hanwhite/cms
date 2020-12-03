const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    imageUrl: { type: String, required: true },
    group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}]
});

module.exports = mongoose.model('Contact', contactSchema);