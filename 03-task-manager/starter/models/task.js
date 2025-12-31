// Mongoos models correlate to the collections in database.
// Mongoos models provide an interface to the database.
// Each collection receives a single model.
const mongoose = require('mongoose');
const schema = {
    name: {
        type: String,
        required: [true, 'You must provide a name.'],
        trim: true,
        maxlength: [20, 'The name cannot contain more than 20 characters.'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
};
const TaskSchema = new mongoose.Schema(schema);
module.exports = mongoose.model('Task', TaskSchema);