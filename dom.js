// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application

// THE FUNCTIONS IN THIS DOC ARE NOT NECESSARILY IN A SENSIBLE ORDER. THE MAIN DIFFICULTY
// IS WORKING OUT HOW EACH RELATES TO ONE ANOTHER.

// My advice would be to highlight the variable and argument names and look where else
// they come up...that way you can see which functions call the returns of others
// hint... the bottom three functions are very important!

// The functions we wrote here are mainly to append items to the DOM.
// The added items which are buttons need event listeners to do their own functions
// such as delete item, mark item etc.

(function() {
    // This is the dom node where we will keep our todo
    var container = document.getElementById('todo-container');
    var addTodoForm = document.getElementById('add-todo');
  
    var state = [
      { id: -3, description: 'Never push to master', done: false}
    ]; // this is our initial todoList
    // This is the todo that displays on the page when we open it in browser.
    // As you can see it contains an id, description with todo as value and a done value, currently false
    // The id is -3 because the generateId function in logic.js gives ids beginning with 1.
    // As such a value of -3 means that the default list item does not interfere with new items to add.
  
    // This function takes a todo, it returns the DOM node representing that todo
    var createTodoNode = function(todo) {
      var todoNode = document.createElement('li');
      //you will need to use addEventListener
      var span = document.createElement("span");
    // var newItem = todoFunction.addTodo(state, newTodo);
      span.textContent = todo.description;

      todoNode.appendChild(span);

      // add markTodo button
      let markTodoButton = document.createElement("button");
      markTodoButton.setAttribute("aria-label", "Check button");
      if(todo.done){
          markTodoButton.classList.add('marked');
          span.setAttribute("style", "text-decoration: line-through;")
        } else {
          markTodoButton.classList.add('unmarked');
        }
      markTodoButton.addEventListener("click", function(event){
        var newState = todoFunctions.markTodo(state, todo.id);
        update(newState);
      });
      todoNode.appendChild(markTodoButton);

      // this adds the delete button
      var deleteButtonNode = document.createElement('button');
      deleteButtonNode.setAttribute("aria-label", "Delete button");
      deleteButtonNode.addEventListener('click', function(event) {
        var newState = todoFunctions.deleteTodo(state, todo.id);
        update(newState);
      });
      todoNode.appendChild(deleteButtonNode);
      
      // add classes for css
      deleteButtonNode.className = "delete";

      return todoNode;
    };
  
    // bind create todo form
    if (addTodoForm) {
      addTodoForm.addEventListener('submit', function(event) {
        // https://developer.mozilla.org/en-US/docs/Web/Events/submit
        // what does event.preventDefault do?
        // what is inside event.target?
        
        event.preventDefault();

      var description = event.target.description.value; // event.target ....
      // console.log(event.target.description.value);

      // hint: todoFunctions.addTodo
      var newState = todoFunctions.addTodo(state, description); // ?? change this!
      document.getElementById("add-todo").reset();
      update(newState);
      });
    }
  
    // you should not need to change this function
    // This function was given to us to begin with
    var update = function(newState) {
      state = newState;
      renderState(state);
    };
  
    // you do not need to change this function
    // This function was given to us to begin with

    var renderState = function(state) {
      var todoListNode = document.createElement('ul');
  
      state.forEach(function(todo) {
        todoListNode.appendChild(createTodoNode(todo));
      });
  
      // you may want to add a class for css
      container.replaceChild(todoListNode, container.firstChild);
    };
  
    if (container) renderState(state);
  })();