const Task = require('./../models/task');
const asyncWrapper = require('../middleware/async');
const { CustomAPIError, createCustomError } = require('./../errors/custom-error');

// *** Option A - creating a try/catch block for each controller ***

// Get All Tasks
// const getAllTasks = async (req, res) => {
//     try {
//         // res.send('retrieve all items');
//         const tasks = await Task.find({});
//         res.status(200).json({ tasks });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     };
// };

// Create New Task
// const createOneTask = async (req, res) => {
//     try {
//         const task = await Task.create(req.body);
//         res.status(201).send({ task });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     };
// };

// Get a Single Task
// const getOneTask = async (req, res) => {
//     try {
// res.send('retrieve one item');
//         const { id: taskID } = req.params;
//         const task = await Task.findOne({ _id: taskID });
//         if (!task) return res.status(404).json({ msg: `No task with the ${taskID} id found.` });
//         res.status(200).json({ task });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     };
// };

// Update a Task
// const updateOneTask = async (req, res) => {
//     try {
//         // res.send('update one item items');
//         const { id: taskID } = req.params;
//         const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true });
//         if (!task) return res.status(404).json({ msg: `No task with the ${taskID} id found.` });
//         res.status(200).json({ task });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     };
// };

// Delete a Task
// const deleteOneTask = async (req, res) => {
//     try {
//         // res.send('delete one item');
//         const { id: taskID } = req.params;
//         const task = await Task.findOneAndDelete({ _id: taskID });
//         if (!task) return res.status(404).json({ msg: `No task with the ${taskID} id found.` });
//         res.status(200).json({ task });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     };
// };


// *** Option B - using asyncWrapper to handle the try/catch blocks. ***

// Get All Tasks
const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});

// Create New Task
const createOneTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).send({ task });
});

// Get a Single Task
const getOneTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    // *** Option A for handling an error. ***
    if (!task) return next(createCustomError(`Error retrieving the task with this ${taskID} ID.`, 404));
    res.status(200).json({ task });
});

// Update a Task
const updateOneTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true });

    // *** Option B for handling an error. ***
    // Manually created error to demonstrate the (new) middleware error handler (../middleware/error-handler)
    if (!task) {
        const error = new Error('NOT FOUND ERROR');
        error.status = 404;
        error.msg = `Error retrieving the task with this ${taskID} ID.`
        return next(error);
    }
    res.status(200).json({ task });
});

// Delete a Task
const deleteOneTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    // *** Option C for handling an error. ***
    if (!task) return res.status(404).json({ msg: `No task with the ${taskID} id found.` });
    res.status(200).json({ task });
});

module.exports = { getAllTasks, createOneTask, getOneTask, updateOneTask, deleteOneTask };