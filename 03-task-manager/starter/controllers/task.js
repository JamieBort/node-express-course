const Task = require('./../models/task');

// Get All Tasks
const getAllTasks = (req, res) => {
    res.send('retrieve all items')
};

// Create New Task
const createOneTask = async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).send({ task });
};

// Get a Single Task
const getOneTask = (req, res) => {
    res.send('retrieve one item')
};

// Update a Task
const updateOneTask = (req, res) => {
    res.send('update one item items');
};

// Delete a Task
const deleteOneTask = (req, res) => {
    res.send('delete one item')
};

module.exports = { getAllTasks, createOneTask, getOneTask, updateOneTask, deleteOneTask };