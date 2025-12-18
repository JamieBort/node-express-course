

// Each challenge will be related to this array of names. It will pose a
// problem related to these names, and then implement the solution. The
// challenges are:
//

// - Create a new array where everyone's name is converted to "Title Case"
//   - The first character of each word should be uppercase
//   - All other characters in the word should be lowercase
//   - expected output is ['Dimitry Santiago', 'Carlos D. Perez', 'Tam Person', ...]
// - Last Challenge:
//     Remove names with the wrong format
//     AND change it to "Title Case"
//     AND remove people whose last name ends with z
//     AND write a message asking them to sign up
//
// For an extra assignment, you may implement these yourself! Include your
// changes to this file with your MR for week 3.

const names = [
    'Dimitry SantiAgo',
    'Carlos d. Perez',
    'tam  person',
    'Mariana Gomez',
    'Amy You'
];
// - Create a new array with only each person's last name
const array_of_last_names = [];
const callback = (params) => {
    const stringArray = params.split(/(\s+)/);
    const length = stringArray.length
    const last_name = stringArray[length - 1];
    // console.log(last_name);
    array_of_last_names.push(last_name)
}
names.forEach(callback);
console.log(array_of_last_names);

// Next use const words = name.split(' ');  // Split the name by spaces


// - Filter names that don't match the format "<first> <last>"
//   - Should remove Tam because she has a double-space
//   - Should remove Carlow because he has a middle-name
//   - Should also remove names like:
//     - "Timothy      Cook"
//     - "Nick_Masters"
//     - "Timmy-Turner"
//     - "Billy\nBob"
//     - etc.