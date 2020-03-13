//function constructor
//common way of building js object using consturctor its like pattern way
//function consturctor implies that we are gonna use function and it always start with capital letter

// var john = {
//     name: 'John',
//     yearOfBirth: 1990,
//     job: 'teacher'
// };

const Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};

//we can use the Person consturor to create john object and more objects
const john = new Person('John', 1990, 'teacher');
//new keyword for create new object
//Person function is called with aergument we passed to it
//calling function create new excution context
//this keyword in regular function call is point to the global object but for constuctor this keyword point to the new object which is created using new keyword
//if we want to add a method to john object we can add it to consturctor then inherit it from the constructor

Person.prototype.calculateAge = function() {
  console.log(2016 - this.yearOfBirth);
};
//now we add new method to the constuctor which will be available for any object creacted form this constructor
console.log(john.calculateAge()); //print 26 in console so the new prototype is added to john object

//we can make more copies from that instructor
Person.prototype.lastName = 'Smith';
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');
john.calculateAge();
jane.calculateAge();
mark.calculateAge();
console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);

// if we want to test the properties that belong to object like john object we can use hasOwnProperty method then we find that all the prop its inherit from the prototype of the consturctor return false
console.log(john.hasOwnProperty('job')); //true
console.log(john.hasOwnProperty('lastName')); //false

//another example
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}
MyObject.prototype.getName = function() {
  return this.name;
};
MyObject.prototype.getMessage = function() {
  return this.message;
};

const newObj = new MyObject('hary', 'be save');
console.log(newObj.getName());

//object.create

/*var personProto = {
  calculateAge: function() {
    console.log(2016 - this.yearOfBirth);
  }
};

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto, {
  name: {
    value: 'Jane'
  },
  yearOfBirth: {
    value: 1969
  },
  job: {
    value: 'designer'
  }
});
/*the difference between the two methods that object.create built an object that inherent properties directly from the one that we pass into the first arg while function instructor the new object inhert from the consturctor portotype properties

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Primitives vs objects
Primitives
primitives are holding the values of the data they are assgined to
var a = 23;
var b = a;
a = 46;
console.log(a);
console.log(b);
*/

// Objects
var obj1 = {
  name: 'John',
  age: 26
};
var obj2 = obj1;

obj1.age = 30;
console.log(obj1.age); //30
console.log(obj2.age); //30
//obj2 = obj1 does not mean that we create new object but whats happened that created new reference that points to the first object
//so when we change the age in obj1 this also reflected in obj2 because they are both refer to the same object

//changing value in primitives and objects

const age = 27;

const obj = {
  name: 'Jonas',
  city: 'Lisbon'
};

function change(a, b) {
  a = 20;
  b.city = 'Gaza';
}

change(age, obj); // age =20, city = Gaza

console.log(age); //27
console.log(obj.city); //Gaza

//when we change the value for primitives so the second value mutate the first value means that primitives is create new copy and the value of a inside the function is not affected the value of a outside
//but when we pass object not the object itself that is pass but the reference that point to that object so when change the object inside the function it still reflected outside the function
//primitives pass by value but objects pass by reference

///////////////////////////////////////////////////////////////////////////

//functions

/*function is also an object in js and its instance of the object type so functions behaves like other objects
- we can store fun in a variable
- we can pass fun as an argument to another fun
- we can return fun from another fun
- so they called first class function
*/

//passing functions as arguments
const years = [1993, 1940, 1994, 1978, 2010];

function arrCalc(arr, fn) {
  const arrRes = [];

  for (i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}

function calcAge(el) {
  return 2020 - el;
}

function fullAges(el) {
  return el > 18;
}

//passing callback function as argument to the arrCalc function
const ages = arrCalc(years, calcAge);
console.log(ages);

//we can pass as many as functions to the same function as an arguments
const fullA = arrCalc(years, fullAges);
console.log(fullA);

//////////////////////////////////////////
//Functions returning functions
function interviewQuestions(job) {
  if (job === 'desginer') {
    return function(name) {
      console.log(name + ', can you please explain what UX design is?');
    };
  } else if (job === 'teacher') {
    return function(name) {
      console.log('What subject do you teach, ' + name + '?');
    };
  } else {
    return function(name) {
      console.log('Hello ' + name + ', what do you do?');
    };
  }
}

const teacherQuestion = interviewQuestions('teacher');
console.log(teacherQuestion);
/*ƒ (name) {
    console.log('What subject do you teach, ' + name + '?');
}*/

//so the interviewQuestions function return another function which can be called
teacherQuestion('jane');

const designerQuestion = interviewQuestions('designer');
designerQuestion('mark');

///////////////////////////////////////////////////////////////////////

//IIFE

// function game() {
//     var score = Math.random() * 10;
//     console.log(score >= 5);
// }
// game();

(function() {
  var score = Math.random() * 10;
  console.log(score >= 5);
})();
//console.log(score);

(function(random) {
  var score = Math.random() * 10;
  console.log(score >= 5 - random);
})(5);

////////////////////////////////////////////////////////////////////////////

//Closures
// an inner function has always access to the variables and parameters of its outer function, even after the outer function has returned
function retirement(retirementAge) {
  var a = ' years left until retirement.';
  return function(yearOfBirth) {
    var age = 2016 - yearOfBirth;
    console.log(retirementAge - age + a);
  };
}
var retirementUS = retirement(66);
retirementUS(1993);
//another way of call
// retirement(66)(1993);

//why inner function can access the vars and params of the outer function even after the outer function has returned
//simply because when the retirement fun is called its gets new excution context which added to the top of excution stack
//the execution context has object which store the vars and scope chain and this var
//the scope chain for retirement function(the vars which the fun has accessed to )
//then after the vars added to execution context and scope chain which in this case are (var a, retirememtAge argument) the function returned and removed from the stack but the vars still in the stack and in scope chain after the fun has removed in which the inner fun can access to.
//the current execution context has closed in the outer vars so thats way called closures
//a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

//challenge: rewrite the interviewQuestions function with closuer
/*function interviewQuestions(job) {
    if (job === 'desginer') {
      return function(name) {
        console.log(name + ', can you please explain what UX design is?');
      };
    } else if (job === 'teacher') {
      return function(name) {
        console.log('What subject do you teach, ' + name + '?');
      };
    } else {
      return function(name) {
        console.log('Hello ' + name + ', what do you do?');
      };
    }
  }*/

function interviewQuestions(job) {
  //becuse of clouser we can access job argument inside the inner function even the interviewQuestions fun has returned and this is the power of clouser in which we have one inner function instead od three functions with more clean code
  return function(name) {
    if (job === 'desginer') {
      console.log(name + ', can you please explain what UX design is?');
    } else if (job === 'teacher') {
      console.log('What subject do you teach, ' + name + '?');
    } else {
      console.log('Hello ' + name + ', what do you do?');
    }
  };
}

interviewQuestions('programmer')('marwa');
