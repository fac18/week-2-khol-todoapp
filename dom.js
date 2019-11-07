// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
    // This is the dom node where we will keep our todo
    var container = document.getElementById('todo-container');
    var addTodoForm = document.getElementById('add-todo');
  
    var state = [
      { id: -3, description: 'Never push to master' }
    ]; // this is our initial todoList
  
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

      // R
      // todoNode.textContent = todo.description;
      // let markTodoButtonNode = document.createElement("button");
      // markTodoButtonNode.addEventListener('click', function(event) {
      //   let newState = todoFunctions.markTodo(state, todo.id);
      //   update(newState);
      //   if (todo.done) {
      //     markTodoButtonNode.classList.add('.marked');
      //     markTodoButtonNode.setAttribute("aria-label", "Mark as not done");
      //     todoSpan.style.textDecoration = "line-through";
      //   } else {
      //     markTodoButtonNode.classList.add('.unmarked');
      //   }
      // });
      // todoNode.appendChild(markTodoButtonNode);
      
      // J
      // add markTodo button
      // let markTodoButton = document.createElement('button');
      // markTodoButton.addEventListener('click', function(event) {
      //   let newState = todoFunctions.markTodo(state, todo.id);
      //   update(newState);
      // });

      // if (state.done == true) {
      //   markTodoButton.className = "marked";
      // } else {
      //   markTodoButton.className = "unmarked";
      // };
  
      // todoNode.appendChild(markTodoButton);


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
    var update = function(newState) {
      state = newState;
      renderState(state);
    };
  
    // you do not need to change this function
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