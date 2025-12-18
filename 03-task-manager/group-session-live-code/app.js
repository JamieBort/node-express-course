const express = require('express');
const app = express();
// const tasks = require('./routes/tasks');

const port = 4000;

app.listen(port, () =>
    console.log(`Server is listening on port ${port}...`)
);