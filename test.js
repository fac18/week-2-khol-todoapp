var test = require('tape');
var todoFunctions = require('./logic');

test('Example test', function(t) {
  t.pass();
  t.end();
});

// Creating fake arrays to input into our first test function

// So first we have an example array that might already be stored as todos on the page.
// Note that each object has a description, id and check for done or not. 
// These are the parts that the main functions input or alter.

const testArray = [
  {
    description: 'Go to the shops',
    done: false,
    id: 0
  },
  {
    description: 'Make tea for Jamie',
    done: false,
    id: 0
  },
  {
    description: 'Text Nikke',
    done: false,
    id: 0
  }
];

// This is an example string that would be added to the list.
// this test is to see if the below string will be passed into the object array and given an id and done value.

const newObj = "Say hi Ayub";

// The test says that we expect the addTodo function in logic.js to return an array with four items.
// thats the above array with three items and the above additional new string.
// The expected is hardcoded for the test, but the actual that we pass in is in the form of variable arguments
// This is so that we know that it passes named variables ok.

test('returns testArray with an additional item', function(t) {
  const expected = [
    {
      description: 'Go to the shops',
      done: false,
      id: 0
    },
    {
      description: 'Make tea for Jamie',
      done: false,
      id: 0
    },
    {
      description: 'Text Nikke',
      done: false,
      id: 0
    }, 
    {
      description: 'Say hi Ayub',
      done: false,
      id: 1
  }
  ];
  const actual = todoFunctions.addTodo(testArray, newObj);
  
  t.deepEqual(actual, expected, 'addTodo should return testArray with a new item');
  t.end();
})

// If we use t.Equal the test fails even if the objects returned are identical.
// So we use t.deepEqual which is somehow more lenient and seems to work better with complex data like objects


// Try testing to add the FIRST todo item...
// Because the id generator function works as the items are newly added NOT on the list as a whole...
// It adds an ID ONLY TO NEW ITEMS (in the below case its newObjId)
// Also it appends ID as the LAST item in the object not first as we had it.
// For whatever reason the generate id function reiterates on each test so the expected id is 2...
// This is fine as we can expect to add new items from zero, so the function should work properly?

// The next test is for adding a new todo item to an empty array
// We pass the test function an empty array and the same new todo as last test.

const noIds = [];

const newObjId = 'Say hi Ayub'

// ...and we expect its result to be a single object with our three key values.

test('adds an id to each item', function(t) {
  const expected = [
      {
        description: 'Say hi Ayub',
        done: false,
        id: 2
      }
  ];
  const actual = todoFunctions.addTodo(noIds, newObjId);
  
  t.deepEqual(actual, expected, 'addTodo add an id to each item');
  t.end();
})

const deleteTest = [
  {
    description: 'Go to the shops',
    done: false,
    id: 1
  },
  {
    description: 'Make tea for Jamie',
    done: false,
    id: 2
  },
  {
    description: 'Text Nikke',
    done: true,
    id: 3
  }
];

// Next we will test that we can make a clone of the array to edit without changing the original.
// This has to be done with the cloneArrayOfObjects function rather than a straight copy.
// As it has objects, a normal copy would change the original, as the copy's data links to the original
// The clone function makes a safe copy to work with.
// The clone function is used in every function that edits the list array.

test('checks idToDelete', function(t) {
  const expected = [
    {
      description: 'Go to the shops',
      done: false,
      id: 1
    },
    {
      description: 'Make tea for Jamie',
      done: false,
      id: 2
    },
    {
      description: 'Text Nikke',
      done: true,
      id: 3
    }
  ];
  const actual = todoFunctions.deleteTodo(deleteTest);
  t.deepEqual(actual, expected, 'should return a new version without afecting the old obj');
  t.end();
})

// Next we want to test that our delete function will delete an item from the array

const arrayToFilter = [
  {
    description: 'Go to the shops',
    done: false,
    id: 1
  },
  {
    description: 'Make tea for Jamie',
    done: true,
    id: 2
  },
  {
    description: 'Text Nikke',
    done: true,
    id: 3
  }
];

// We expect to return the object but without the item stored with id of 2.

test('checks idToDelete ids', function(t) {
  const expected = [
    {
      description: 'Go to the shops',
      done: false,
      id: 1
    },
    {
      description: 'Text Nikke',
      done: true,
      id: 3
    }
  ];  
  const actual = todoFunctions.deleteTodo(arrayToFilter, 2);
  t.deepEqual(actual, expected, 'idToDelete should filter the ids to not be equal');
  t.end();
})

// a new array to test our mark function...

const arrayToMark = [
  {
    description: 'Go to the shops',
    done: false,
    id: 1
  },
  {
    description: 'Make tea for Jamie',
    done: false,
    id: 2
  },
  {
    description: 'Text Nikke',
    done: false,
    id: 3
  }
];

// Next we test that our arrayToMark function will change a done value from false to true.

test('checks markTodo ids', function(t) {
  const expected = [
    {
      description: 'Go to the shops',
      done: false,
      id: 1
    },
    {
      description: 'Make tea for Jamie',
      done: true,
      id: 2
    },
    {
      description: 'Text Nikke',
      done: false,
      id: 3
    }
  ];
  const actual = todoFunctions.markTodo(arrayToMark, 2);
  t.deepEqual(actual, expected, 'markTodo array should return unchanged elem except the id: idToMark');
  t.end();
})

// With npm dependencies installed, run npm test to see the tests pass!

// Generally the idea is that the expected variable will be what you want the function to return. 
// This can be hard coded to exactly what you expect to return.

// The actual variable takes the function you want to test, with relevant fake or real variables passed as arguments
// So the test sends the variables to work with into the function in logic.js
// The function in logic.js returns the result
// If the result was the same as the test's expected variable data, the test passes and that part of the logic.js function works!
// If the test fails you know that the function in logic.js has a problem somewhere.
// Hopefully in a failing test, the error readout will provide a clue as to where the problem is.
