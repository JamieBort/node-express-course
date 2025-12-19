const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
// require('./db/connect');
const connectDB = require('./db/connect');
// require('dotenv').config();
require('dotenv').config();


// middleware

app.use(express.json());
app.use('/api/v1/tasks', tasks);

// routes

app.get('/', (req, res) => {
    app.send('Task Manger app')
});

const port = 3000;

const start = async () => {
    try {
        // await connectDB(connectionString);
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(`There was an error starting the app.`);
        console.log(error);
    }
};

start();