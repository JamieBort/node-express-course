const mongoose = require('mongoose');
const options = { // Added as a result of output warnings from when the db was first successfully connected.
    useNewUrlParser: true,
    // useCreateIndex: true, // Didn't address any warnings.
    // useFindAndModify: false, // Didn't address any warnings.
    useUnifiedTopology: true
};

// mongoose.connect(connectionString, options).then(() => console.log("Connected to the database.")).catch((error) => {
//     console.log(`There was an error.`);
//     console.log(error);
// });

const connectDB = (url) => mongoose.connect(url, options).then(() => console.log(`Connected to the ${mongoose.connection.name} database.`)).catch((error) => {
    console.log(`There was an error connecting to the database.`);
    console.log(error);
});

module.exports = connectDB;