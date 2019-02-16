const inputData = [
  {
    "_id": "5b5e3168c6bf40f2c1235cd6",
    "index": 0,
    "age": 39,
    "eyeColor": "green",
    "name": "Stein",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5b5e3168e328c0d72e4f27d8",
    "index": 1,
    "age": 38,
    "eyeColor": "blue",
    "name": "Cortez",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5b5e3168cc79132b631c666a",
    "index": 2,
    "age": 2,
    "eyeColor": "blue",
    "name": "Suzette",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5b5e31682093adcc6cd0dde5",
    "index": 3,
    "age": 19,
    "eyeColor": "green",
    "name": "George",
    "favoriteFruit": "banana"
  }
];

function findTypes (...values) {
  let types = [];

  for (let i = 0; i < values.length; i++) {
    types.push(typeof values[i]);
  }

  return types;
}
findTypes(null, 5, 'hello');

function executeforEach (arr, func) {
  for (let i = 0; i < arr.length; i++) {
    func(arr[i]);
  }
}
executeforEach([1, 2, 3], el => console.log(el));

function mapArray (arr, func) {
  let mappedArr = [];

  executeforEach(arr, el => mappedArr.push(func(el)));
  return mappedArr;
}
mapArray([2, 5, 8], el => el + 3);

function filterArray (arr, func) {
  let filteredArr = [];

  executeforEach(arr, el => {
    if (func(el)) {
      filteredArr.push(el);
    }
  })
  return filteredArr;
}
filterArray([2, 5, 8], el => el > 3);

function getAmountOfAdultPeople (data) {
  let amount = 0;

  filterArray(data, user => user.age > 18 && ++amount);
  return amount;
}
getAmountOfAdultPeople(inputData);

function getGreenAdultBananaLovers (data) {
  return mapArray(
    filterArray(data, user => 
      user.age > 18 && user.favoriteFruit === 'banana' && user.eyeColor === 'green'
    ),
    user => user.name
  );
}
getGreenAdultBananaLovers(inputData);

function keys (objEntries) {
  let arrOfKeys = [];

  for (let key in objEntries) {
    if (objEntries.hasOwnProperty(key)) {
      arrOfKeys.push(key);
    }
  }
  return arrOfKeys;
}
keys({keyOne: 1, keyTwo: 2, keyThree: 3});

function values (objEntries) {
  let arrOfValues = [];

  for (let key in objEntries) {
    if (objEntries.hasOwnProperty(key)) {
      arrOfValues.push(objEntries[key]);
    }
  }
  return arrOfValues;
}
values({keyOne: 1, keyTwo: 2, keyThree: 3});

function showFormattedDate (date) {
  const MONTHS_LETTER = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  return `Date: ${date.getDate()} of ${MONTHS_LETTER[date.getMonth()]}, ${date.getFullYear()}`;
}
showFormattedDate(new Date('2019-01-27T01:10:00'));

function isEvenYear (date) {
  return date.getFullYear() % 2 === 0;
}
isEvenYear(new Date('2019-01-27T01:10:00'));

function isEvenMonth (date) {
  return (date.getMonth() + 1) % 2 === 0;
}
isEvenMonth(new Date('2019-02-27T01:10:00'));
