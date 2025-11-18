// 01-node-tutorial/answers/writeWithPromisesAwait.js

const { writeFile, readFile } = require("fs").promises; 

// Declare constants.
const fileName = `temp.txt`;
const statement="Random statements.";

const writer = async () => {
    try { 
        
       for (let index = 0; index < 1; index++) {
        result = await writeFile(`./content/${fileName}`, `Newly added text : ${statement}\n`, { flag: "a" });        
       }
       } catch(err) {
        console.log("There was an error while writing to the file: ", err);
    }
};

const reader = async () => {
    try { 
       result = await readFile(`./content/${fileName}`, "utf8")
       } catch(err) {
    }
    console.log(result);
    // return result;
};

writer().then(reader()).catch(err=>console.log("There was an erorr:", err)).finally(()=>console.log("We're done."))

// const readWrite = () => {
//     writer().then(reader()).catch(err=>console.log("There was an erorr:", err)).finally(()=>console.log("We're done."))
// }
// readWrite();