// ./controllers/people.js

const { json } = require("express"); // Is this used?
const { people } = require("./../data");

const getPeople = (req, res) => {
  console.log('The /api/v1/people endpoint');
    res.json(people);
};

const getPerson = (req, res) => {
  console.log('The /api/v1/product/:productID endpoint CHANGE THIS');
  const personToFind = parseInt(req.params.personID);
    const person = people.find((p) => p.id === personToFind);
     // If not found, return 404 JSON
    if (!person) {
        return res.status(404).json({ message: "That person was not found." });
    }
    else res.status(200).json({message: "That person was found.", person});
};

const addPerson =  (req, res) => {
  const { name } = req.body; // Extract name from the request body

  // Check if name is provided
  if (!name) {
    return res.status(400).json({ success: false, message: "Please provide a name" });
  }

   // Check if name already exists in people array
  const personExists = people.some(person => person.name === name);
  if (personExists) {
    return res.status(400).json({ success: false, message: `${name} already exists.` });
  }

  // Add the new person to the array with a new ID
  const newPerson = { id: people.length + 1, name };
  people.push(newPerson);

  // Respond with success message and the new person's data
  res.status(201).json({ success: true, name , message: `Your name, ${name} was added.`});
};

const deletePerson =  (req, res) => {
  const id = parseInt(req.params.personID);

  // Check if the person is in the array.
  does_person_exist = people.some(person => person.id === id);
  if (!does_person_exist) {
    return res.status(404).json({ success: false, message: "Please provide an id so we can find the person you'd like to remove." });
  };

  // Remove the person from the array
  const updatedPeople = people.filter(person => person.id !== id);
  // Use 204 if you do not need to return a response body after the deletion.
  // res.status(204).json({ message: "That person was successfully removed.",updatedPeople});
  // Use 200 if you want to send a response body (like the updated list of people) with a successful delete request.
  res.status(200).json({ message: "That person was successfully removed.",updatedPeople});
}

module.exports = { addPerson, getPeople, getPerson, deletePerson};