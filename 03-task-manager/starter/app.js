const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// global middleware
app.use(express.static('./public'));
app.use(express.json());


// routes
app.use('/api/v1/tasks', tasks); // a route
app.use(notFound); // middleware for routes
app.use(errorHandlerMiddleware); // middleware for routes

const port = process.env.PORT || 3000;

const start = async () => {
    try {
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