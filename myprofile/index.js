// const words = [
//     "spray",
//     "limit",
//     "elite",
//     "exuberant",
//     "destruction",
//     "present",
//     "happy"
//   ];

//   let longWords = words.filter(word => word.length > 6);
//   // longWords: ["exuberant", "destruction", "present"]
//   console.log(longWords);


const calcTax = function (totalPrice, name) {
  totalTax = totalPrice * 0.1;

  detailTax = `name: ${name}, tax:${totalTax}`;
  return detailTax;
};

const pajakBaju = calcTax(5000, "Baju");
console.log(pajakBaju);

const pajakMieAyam = calcTax(5000, "Mie Ayam");
console.log(pajakMieAyam);

const pajakIndomie = calcTax(2500, "Indomie");
console.log(pajakIndomie);

let names = ["Budi", "Joni", "Tono", "Jaka"];
const modif = names.map(name => `Mr. ${name}`);
const addMr = name => `Mr. ${name}`;
let newmodif = names.map(addMr);
console.log(newmodif);


function calTaxDefaultName(totalPrice, name = "Anonymous"){
  let totalTax = totalPrice * 0.1;

  let detailTax = `name: ${name}, tax:${totalTax}`;
  return detailTax;
}

const noProductNameTax = calTaxDefaultName(4500);
console.log(noProductNameTax);


console.log(calTaxDefaultName(300));
console.log(calTaxDefaultName(500));



let greeting = "say Hi";
let times = 5;

if (times > 3){
  let hello = "say hello insted";
  console.log(hello);

  console.log(greeting); 
}

