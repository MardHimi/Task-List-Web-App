document.addEventListener("DOMContentLoaded", () => {
    let taskInput = document.getElementById("taskInput");
    let addTaskBtn = document.getElementById("addTaskBtn");
    let taskList = document.getElementById("taskList");
    let taskCounter = document.getElementById("taskCounter");

    loadTasks();

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") addTask();
    });

    function addTask() {
        let taskText = taskInput.value.trim();
        if (!taskText) return;

        let task = {
            text: taskText
        };

        let li = document.createElement("li");
        li.className = "task";

        let span = document.createElement("span");
        span.textContent = taskText;

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => {
            removeTask(li, task);
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        // Save task to local storage
        saveTaskToLocalStorage(task);

        taskInput.value = "";
        taskInput.focus();
        updateTaskCount();
    }

    function removeTask(taskElement, task) {
        taskElement.remove();
        removeTaskFromLocalStorage(task);
        updateTaskCount();
    }

    function updateTaskCount() {
        let taskCount = taskList.children.length;
        taskCounter.textContent = "Tasks: " + taskCount;
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task) => {
            let li = document.createElement("li");
            li.className = "task";

            let span = document.createElement("span");
            span.textContent = task.text;

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";
            deleteBtn.addEventListener("click", () => {
                removeTask(li, task);
            });

            li.appendChild(span);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
        updateTaskCount();
    }

    function saveTaskToLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function removeTaskFromLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(t => t.text !== task.text);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
