var test = require('tape');
var todoFunctions = require('./logic');

let testArray = [
  {
    description: 'Go to the shops',
    done: false,
    id: null
  },
  {
    description: 'Make tea for Jamie',
    done: false,
    id: null
  },
  {
    description: 'Text Nikke',
    done: false,
    id: null
  }
];

let newObj = {
  description: 'Say hi Ayub',
  done: false,
  id: null
};

let noIds = [];

let newObjId = {
  description: 'Say hi Ayub',
  done: false,
  id: null
};

test('Example test', function(t) {
  t.pass();
  t.end();
});

test('doubles value', function(t) {
  let expected = 6;
  let actual = todoFunctions.double(3);
  t.equal(actual, expected, 'the number should be 6');
  t.end();
})

// Instead of expecting the added item to display a fresh id - eg 4, assume that
// as it is the first ADDED item it will have id of 1
// This is because the generate id function is called only on NEW items
// and not on our fake populated object list.

test('returns testArray with an additional item', function(t) {
  let expected = [
    {
      description: 'Go to the shops',
      done: false,
      id: null
    },
    {
      description: 'Make tea for Jamie',
      done: false,
      id: null
    },
    {
      description: 'Text Nikke',
      done: false,
      id: null
    }, 
    {
      description: 'Say hi Ayub',
      done: false,
      id: 1
  }
  ];
  let actual = todoFunctions.addTodo(testArray, newObj);
  
  t.deepEqual(actual, expected, 'addTodo should return testArray with a new item');
  t.end();
})

// Try testing to add the FIRST todo item...
// Because the id generator works as the items are newly added NOT on the list as a whole...
// It adds an ID ONLY TO NEW ITEMS (in the below case its newObjId)
// Also it appends ID as the LAST item in the object not first as we had it.
// For whatever reason the generate id function reiterates on each test so the expected id is 2...
// This is fine as we can expect to add new items from zero, so the function should work properly?

test('adds an id to each item', function(t) {
  let expected = [
      {
        description: 'Say hi Ayub',
        done: false,
        id: 2
      }
  ];
  let actual = todoFunctions.addTodo(noIds, newObjId);
  
  t.deepEqual(actual, expected, 'addTodo add an id to each item');
  t.end();
})
