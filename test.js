var test = require('tape');
var todoFunctions = require('./logic');

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

let newObj = "Say hi Ayub";


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

let noIds = [];

let newObjId = 'Say hi Ayub'


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

let deleteTest = [
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

let deleteObj = {
  description: 'Text Nikke again',
  done: true,
  id: 3
};

test('checks idToDelete', function(t) {
  let expected = [
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
  let actual = todoFunctions.deleteTodo(deleteTest);
  t.deepEqual(actual, expected, 'should return a new version without afecting the old obj');
  t.end();
})

let arrayToFilter = [
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

let filterThis = {
    description: 'Make tea for Jamie',
    done: true,
    id: 2
}

test('checks idToDelete ids', function(t) {
  let expected = [
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
  let actual = todoFunctions.deleteTodo(arrayToFilter, 2);
  t.deepEqual(actual, expected, 'idToDelete should filter the ids to not be equal');
  t.end();
})


let arrayToMark = [
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

let markThis = {
  description: 'Make tea for Jamie',
  done: false,
  id: 2
}



test('checks markTodo ids', function(t) {
  let expected = [
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
  let actual = todoFunctions.markTodo(arrayToMark, 2);
  t.deepEqual(actual, expected, 'markTodo array should return unchanged elem except the id: idToMark');
  t.end();
})