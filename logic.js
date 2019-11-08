  
// Part 1. Fill in any missing parts of the todoFunction object!
// you can access these on todo.todoFunctions
// For part one we expect you to use tdd

// We have here an object containing several functions functions

var todoFunctions = {
    // todoFunctions.generateId() will give you a unique id
    // You do not need to understand the implementation of this function.
    // This function was provided for us entirely.
    generateId: (function() {
      var idCounter = 0;
  
      function incrementCounter() {
        return (idCounter += 1);
      }
  
      return incrementCounter;
    })(),
    
    //cloneArrayOfObjects will create a copy of the todos array 
    //changes to the new array don't affect the original
    // This function was provided for us entirely.

    cloneArrayOfObjects: function(todos) {
      return todos.map(function(todo){
        return JSON.parse(JSON.stringify(todo));
      });
    },
    
    addTodo: function(todos, newTodo) {
      let id = this.generateId();
      let newArr = this.cloneArrayOfObjects(todos);
      let result = newArr.concat([
        { description: newTodo, done: false, id: id }
      ]);
      return result;
      // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
      // returns a new array, it should contain todos with the newTodo added to the end.
      // add an id to the newTodo. You can use the generateId function to create an id.
      // hint: array.concat

      // 1. the function takes the existing todos list and a new todo string as arguments.
      // 2. It then clones a new version of the todos list to work on and calls it newArr.
      // 3. Then we say that the new todo string becomes the description value in the cloned todos object
      // 4. That the done value is false - as it is a new task!
      // 5. and that the id becomes the new id value that the generateId function creates.
      // 6. and last the new complete list item is added to the todos by concat method and returned.
    },
    deleteTodo: function(todos, idToDelete) {
      let newArr2 = this.cloneArrayOfObjects(todos);
      return newArr2.filter( x => x.id !== idToDelete );
      // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
      // return a new array, this should not contain any todo with an id of idToDelete
      // hint: array.filter

      // 1. Clones the current todos array into a new version called newArr2
      // 2. uses the filter method to only return parts of the object whose id value is not the same as idToDelete
    },
    markTodo: function(todos, idToMark) {
      let newArr3 = this.cloneArrayOfObjects(todos);
      for (let i = 0; i < newArr3.length; i++) {
        if (newArr3[i].id == idToMark) {
          if (newArr3[i].done == false) {newArr3[i].done = true;}
          else{
            newArr3[i].done = false;
          }
        }
      }
      return newArr3;
      // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
      // in the new todo array, all elements will remain unchanged except the one with id: idToMark
      // this element will have its done value toggled
      
      // 1. Clones the current todos into a new array called newArr3
      // 2. We loop through the object looking for any item whose id value is the same as idToMark
      // 3. Once found we change that value to true - i.e. that it can now be checked as complete.
      // 4. Return the array with the correct item checked as done
    },
    sortTodos: function(todos, sortFunction) {
      // stretch goal! Do this last
      // should leave the input arguement todos unchanged (you can use cloneArrayOfObjects)
      // sortFunction will have same signature as the sort function in array.sort
      // hint: array.slice, array.sort

      // We didnt get this far 
    }
  };
  
  // Why is this if statement necessary?
  // The answer has something to do with needing to run code both in the browser and in Node.js
  // See this article for more details: 
  // http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
  if (typeof module !== 'undefined') {
    module.exports = todoFunctions;
  }

  // the above sends the object of functions out to wherever it is called on.
  // in the case of this execise that is test.js, which has the import instruction at the top.