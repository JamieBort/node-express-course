// ./routes/people.js

const express = require("express");
const router = express.Router();
const { people } = require("./../data");
const { addPerson, getPeople, getPerson, deletePerson } = require("./../controllers/people");

// GET endpoint for people
router.get('/',getPeople);

router.get('/:personID', getPerson);

// POST endpoint for adding a new person
router.post('/',addPerson);

router.delete('/:personID', deletePerson);

module.exports = router