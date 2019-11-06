var test = require('tape');
var todoFunctions = require('./logic');

let testArray = [
  {
    id: 0,
    description: 'Go to the shops',
    done: true
  },
  {
    id: 1,
    description: 'Make tea for Jamie',
    done: false
  },
  {
    id: 2,
    description: 'Text Nikke',
    done: true
  }
];

let newObj = {
  id: 3;
  description: 'Say hi Ayub',
  done: true
};

let noIds = [
{
  id: 0,
  description: 'add those ids plz',
  done: true
},
{
  id: 1,
  description: 'help us',
  done: false
}
];

let newObjId = {
description: 'Say hi Ayub',
done: true
};

test('Example test', function(t) {
  t.pass();
  t.end();
});

test('returns todo list uncopied', function(t) {
  let actual = testArray;
  let expected = testArray;
  t.equal(actual, expected, 'addTodo should return todos unchanged');
  t.end();
})

test('doubles value', function(t) {
  let expected = 6;
  let actual = todoFunctions.double(3);
  t.equal(actual, expected, 'the number should be 6');
  t.end();
})

test('returns copied todo list ', function(t) {
  let expected = [
    {
      id: 0,
      description: 'Go to the shops',
      done: true
    },
    {
      id: 1,
      description: 'Make tea for Jamie',
      done: false
    },
    {
      id: 2,
      description: 'Text Nikke',
      done: true
    }, 
    {
      id: 3,
      description: 'Say hi Ayub',
      done: true
  }
  ];
  let actual = todoFunctions.addTodo(testArray, newObj);
  
  t.deepEqual(actual, expected, 'addTodo should return testArray with a new item');
  t.end();
})

test('adds an id to each item', function(t) {
  let expected = [
      {
        id: 0,
        description: 'add those ids plz',
        done: true
      },
      {
        id: 1,
        description: 'help us',
        done: false
      },
      {
        id: 2,
        description: 'Say hi Ayub',
        done: true 
      }
  ];
  let actual = todoFunctions.addTodo(noIds, newObjId);
  
  t.deepEqual(actual, expected, 'addTodo add an id to each item');
  t.end();
})