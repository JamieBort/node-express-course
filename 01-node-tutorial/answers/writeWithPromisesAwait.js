// 01-node-tutorial/answers/writeWithPromisesAwait.js

const { writeFile, readFile } = require("fs").promises; 

// Declare constants.
const fileName = `temp.txt`;
const statement="Another random statement";

// Create an async function called writer that takes 0 arguments
const writer = async () => {
    try { 
        // That writes three lines to a file named temp.txt, by calling the writeFile function with await. The Promise version of writeFile takes the same arguments as the one you used in last week’s exercise 10-fs-sync but will return a Promise instead of a result directly.
       for (let index = 0; index < 3; index++) {
        result = await writeFile(`./content/${fileName}`, `Newly added text : ${statement}\n`, { flag: "a" });        
       }
       } catch(err) {
        console.log("There was an error while writing to the file: ", err);
    }
};

// Create another async function called reader that reads the file with await readFile and logs the return value to the screen.
const reader = async () => {
    try { 
       result = await readFile(`./content/${fileName}`, "utf8")
       } catch(err) {
        console.log("There was an error while writing to the file: ", err);
    }
    console.log("result",result);
};

// Now we want to call the two functions in order, first the writer, and the reader. But, be careful! These are asynchronous functions, so if you just call them, you don’t know what order they’ll occur in. And you can’t use await in your mainline code. 
// Write a third async function called readWrite. In that function, you call await reader and await writer. Finally, write a line at the bottom of the file that calls the readWrite function. Test your code. The temp.txt file that your code is creating should not be sent to Github, so you should add this filename as
const readWrite = async () => {
  await writer();
  await reader();
};
readWrite();