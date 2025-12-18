// Mongoos models correlate to the collections in database.
// Mongoos models provide an interface to the database.
// Each collection receives a single model.
const mongoose = require('mongoose');
const schema = {
    name: String,
    completed: Boolean,
};
const TaskSchema = new mongoose.Schema(schema);
module.exports = mongoose.model('Task', TaskSchema);