// Script goes here:

// Declared HTML elements
const inputTodo = document.querySelector('#inputTodo');
const addButton = document.querySelector('#addButton');
const alertText = document.querySelector('#alert');
const tasksDone = document.querySelector('#tasksDone');
const todoList = document.querySelector('#todoList');

// Declared variables
const todoArray = [];
let tasksCompleted = 0;

// Function to update the task completed counter
function updateTasksCompleted() {
    tasksDone.innerText = `${tasksCompleted} completed`;
}

// EventListener for clicking the add button
addButton.addEventListener(
    "click",
    function () {

        // Get value from input and remove whitespaces
        let text = inputTodo.value.trim();

        // Makes sure the animation class is removed from start 
        alertText.classList.remove("alert-animation");

        // Condition: check input not empty
        if (text === '') {
            alertText.innerText = 'Input must not be empty';

            // Small delay for browser to register the class being removed and added again
            setTimeout(function() {
                alertText.classList.add("alert-animation");
            }, 10);

            return;
        }
        else {
            alertText.innerText = '';

        }

        // Create task object
        const taskObject = {
            text: text,
            completed: false
        };

        // Add taskObject to the Array
        todoArray.push(taskObject);

        // Add new html elements in ul
        const listItem = document.createElement('li');
        todoList.appendChild(listItem);

        const itemLabel = document.createElement('span');
        itemLabel.innerText = text;
        listItem.appendChild(itemLabel);

        // Add delete button element in html with trash can icon
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&#128465;';
        deleteButton.type = 'button';
        deleteButton.classList.add('deleteButton');
        listItem.appendChild(deleteButton);

        // Add eventlistener to the span-element
        itemLabel.addEventListener(
            'click',
            function () {

                //Add and remove class for completed task
                itemLabel.classList.toggle('completed');

                taskObject.completed = !taskObject.completed;

                // Update both counters when task is clicked on/completed AND updates if not completed again
                if (taskObject.completed) {
                    tasksCompleted++;
                }
                else {
                    tasksCompleted--;
                }

                updateTasksCompleted();
                
            }
        );

        // Add EvenListener for delete button
        deleteButton.addEventListener('click', function () {

            // Remove task from todoArray
            const index = todoArray.indexOf(taskObject);
            if (index > -1) {
                todoArray.splice(index, 1);

                // Task completed counter - only if task completed first
                if (taskObject.completed) {
                    tasksCompleted--;
                }
            }

            // Remove the list item from DOM
            todoList.removeChild(listItem);

            // Decrease task count only if the task was clicked on/completed
            if (!taskObject.completed) {
                taskCounter--;
            }

            // Update task counter
            updateTasksCompleted();

        });

        // Resets input to placeholder after adding a task 
        inputTodo.value = '';

    }
);