const express = require('express');
const router = express.Router();
const { getAllTasks, createOneTask, getOneTask, updateOneTask, deleteOneTask } = require('./../controllers/task');

// Get All Tasks
// router.route('/').get(getAllTasks);

// Create New Task
// router.route('/').post(createOneTask);

// Get a Single Task
// router.route('/:id').get(getOneTask);

// Update a Task
// router.route('/:id').patch(updateOneTask);

// Delete a Task
// router.route('/:id').delete(deleteOneTask);

router
    .route('/')
    .get(getAllTasks)
    .post(createOneTask);

router
    .route('/:id')
    .get(getOneTask)
    .patch(updateOneTask)
    .delete(deleteOneTask);

module.exports = router;