document.addEventListener("DOMContentLoaded", function() {
    const newItemInput = document.getElementById("item");
    const list = document.getElementById("list");

    let todos = [];

    function updateList() {
      list.innerHTML = "";
      if (todos.length === 0) {
        console.log("No tasks, displaying message");
      } else {
        todos.forEach((todo) => {
          const li = document.createElement("li");
          const label = document.createElement("label");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = todo.completed;
          checkbox.addEventListener("change", () => toggleTodo(todo._id, checkbox.checked));
          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(todo.title));
          li.appendChild(label);
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";
          deleteBtn.className = "btn-del";
          deleteBtn.addEventListener("click", () => deleteTodo(todo._id));
          li.appendChild(deleteBtn);
          list.appendChild(li);
        });
      }
    }

    function toggleTodo(id, completed) {
      todos = todos.map((todo) => (todo._id === id ? { ...todo, completed } : todo));
      updateList();
    }

    function deleteTodo(id) {
      todos = todos.filter((todo) => todo._id !== id);
      updateList();
    }

    document.getElementById("new-item-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const title = newItemInput.value;
      if (title.trim() === "") return;
      const newItem = { _id: Date.now(), title, completed: false };
      todos.push(newItem);
      newItemInput.value = "";
      updateList();
    });

    updateList();
    
    const tabPending = document.getElementById("tab-pending");
    const tabCompleted = document.getElementById("tab-completed");
    const pendingList = document.getElementById("pending-list");
    const completedList = document.getElementById("completed-list");
    const pendingTasks = document.getElementById("pending-tasks");
    const completedTasks = document.getElementById("completed-tasks");
  
    tabPending.addEventListener("click", function () {
      tabPending.classList.add("active");
      tabCompleted.classList.remove("active");
      pendingList.classList.add("active");
      completedList.classList.remove("active");
      updateLists();
    });
  
    tabCompleted.addEventListener("click", function () {
      tabCompleted.classList.add("active");
      tabPending.classList.remove("active");
      completedList.classList.add("active");
      pendingList.classList.remove("active");
      updateLists();
    });
  
    function updatePendingList() {
        pendingTasks.innerHTML = "";
        const pendingTodos = todos.filter((todo) => !todo.completed);
        pendingTodos.forEach((todo) => {
          const li = document.createElement("li");
          const label = document.createElement("label");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = todo.completed;
          checkbox.addEventListener("change", () => toggleTodo(todo._id, checkbox.checked));
          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(todo.title));
          li.appendChild(label);
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";
          deleteBtn.className = "btn-del";
          deleteBtn.addEventListener("click", () => deleteTodo(todo._id));
          li.appendChild(deleteBtn);
          pendingTasks.appendChild(li);
        });
      }
      
      function updateCompletedList() {
        completedTasks.innerHTML = "";
        const completedTodos = todos.filter((todo) => todo.completed);
        completedTodos.forEach((todo) => {
          const li = document.createElement("li");
          const label = document.createElement("label");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = todo.completed;
          checkbox.addEventListener("change", () => toggleTodo(todo._id, checkbox.checked));
          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(todo.title));
          li.appendChild(label);
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";
          deleteBtn.className = "btn-del";
          deleteBtn.addEventListener("click", () => deleteTodo(todo._id));
          li.appendChild(deleteBtn);
          completedTasks.appendChild(li);
        });
      }
      
    function updateLists() {
      updatePendingList();
      updateCompletedList();
      if (pendingTasks.children.length === 0) {
        document.getElementById("pending-heading").textContent = "No pending tasks";
      } else {
        document.getElementById("pending-heading").textContent = "Pending Tasks";
      }
    
      if (completedTasks.children.length === 0) {
        document.getElementById("completed-heading").textContent = "No completed tasks";
      } else {
        document.getElementById("completed-heading").textContent = "Completed Tasks";
      }
    }
    
  });