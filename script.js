//ternary operator

const age = 20;

const isYoung = age >= 30 ? 'old' : 'young';
console.log(isYoung);

//switch for large if statmenent

switch (true) {
  case age < 13:
    console.log('child');
    break;
  case age >= 13 && age < 20:
    console.log('tenager');
    break;
  case age >= 20 && age < 30:
    console.log('young man');
    break;
  default:
    console.log('old man');
}

//truty and falsey;
//falsey values ( undefiend, null, '', 0, NaN)

var num;
num = 0;

const isNum = num || num === 0 ? 'number is defined' : 'number is not defined';
console.log(isNum);

//equality operator == vs strict operator ===
const isEqual =
  num === '0'
    ? '==  operator dose type coercion'
    : 'strict operator dose not type coercion';
console.log(isEqual);

//function statement (declaration) does not produce a value or result

function foo(_param1, _param2) {}

//function expression (whenever js expect a value or result we use expression)

const anotherFoo = function(job, firstName) {
  switch (job) {
    case 'teacher':
      console.log(`${firstName} is a teacher`);
      break;
    case 'doctor':
      console.log(`${firstName} is a doctor`);
      break;
    case 'programmer':
      console.log(`${firstName} is a programmer`);
      break;
    default:
      console.log(`${firstName} is a worker`);
  }
};

anotherFoo('nurse', 'joe');

//array

const arr1 = ['a', 'b', 'c'];

console.log(arr1.length, arr1[2]);
console.log((arr1[arr1.length] = 'd'), arr1);
console.log(arr1.push('w'), arr1); //push to end of array
console.log(arr1.pop(), arr1); // remove last element from array
console.log(arr1.shift(), arr1); // remove first element of array
console.log(arr1.unshift('r'), arr1); // add to first of array
console.log(arr1.indexOf(2), arr1); // test if element is exist in the array and define its position
const isExist =
  arr1.indexOf('b') === -1 ? 'b is not in array' : 'b is in array';
console.log(isExist);

//challange 2:38:49
const whatTip = function(bill) {
  var percentage;
  switch (bill) {
    case bill < 50:
      percentage = 0.2;
      break;
    case 50 < bill < 200:
      percentage = 0.15;
      break;
    default:
      percentage = 0.1;
      return percentage;
  }
};

console.log(whatTip(399)); //another solution with if

//code challange 3:51:49
// const John = {
//   fullName: 'John doe',
//   mass: 55,
//   hieght: 155,
//   BMI: function() {
//     return (this.mass / this.hieght) * 2;
//   }
// };

// const JohnBMI = John.BMI();
// console.log(JohnBMI);

const BMICalc = function(fullName, mass, hieght) {
  return {
    fullName,
    mass,
    hieght,
    BMI: function(mass, hieght) {
      return this.mass / (this.hieght * this.hieght);
    }
  };
};

const JohnBMI = BMICalc('john', 92, 1.95).BMI();
const MarkBMI = BMICalc('mark', 78, 1.69).BMI();
console.log(JohnBMI);
console.log(MarkBMI);

//how js works
//our code is excuted in the browser by js engine (v8) which parse code line by line and check the syntex of the code and if there any problems throw an error then if everything is ok it produce abstract synttax tree which transtaed to machine code then its run .
//execution context (container or box which wrap and store vars and in which apice of code is executed)
//global execution context which code is not inside any function and its call window object.

//Hoisting
//in hoisting only function declaration can be executed before it declaced but function expression and variable is not it must be declared before it called

//scoping
//every function has scope which all vars inside that function belong to its scope
//lexical scope where the function is lexically within another function and access the scope of the outer function
//global object can be accessable from all function and nested function but not the verse
//global excution context call the first function which added to the execution stack the first function call the second the once its finished it removed from the stack

//This keyword
// this keyowrd point to global object inside function and in global object
console.log(this);

calculateAge(1985);
function calculateAge(year) {
  console.log(2016 - year);
  console.log(this);
}

// this in both cases refers to the global object

var john = {
  name: 'John',
  yearOfBirth: 1990,
  calculateAge: function() {
    console.log(this); //this is point to the john object
    console.log(2016 - this.yearOfBirth);

    function innerFunction() {
      console.log(this); // this point to the global object
    }
    innerFunction();
  }
};
john.calculateAge();

//when function is a method for an object then this keyword inside this function refer to the object that the function is method for it(like in calculateAge)
//other functions are refering to the global object otherwise its function inside method  (like in innerfunction)

var mike = {
  name: 'Mike',
  yearOfBirth: 1984
};

//if we want to add calculateAge method also to mike object then not neccessary to copy paste the code again and we can just borrow it from john object by adding it as property to to mike object

mike.calculateAge = john.calculateAge; //calculateAge without () coz we are not calling the function
mike.calculateAge();
