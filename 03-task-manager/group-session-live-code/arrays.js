const array01 = new Array(4);
const array02 = new Array(1, 6, 4);
const array03 = new Array(true, 4, { a: 3, b: false });
// console.log(array01.length);
// console.log(array01);
// console.log(array02);
// console.log(array03);
console.log(array01);
const result = array01.push(true);
console.log(result)
console.log(array01);
array01.findLast()