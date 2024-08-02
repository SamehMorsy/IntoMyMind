// Toggle the visibility of the icons menu
document.getElementById('icon-btn').addEventListener('click', () => {
    document.getElementById('show-icons').classList.toggle("active");
});

// Main container where widgets will be added
const main = document.getElementById('main');

// Function to add drag and close functionality to widgets
function addDragAndCloseFunctionality(wrapper) {
    const header = wrapper.querySelector('.header');
    const closeBtn = header.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        main.removeChild(wrapper);
    });

    header.addEventListener('mousedown', () => {
        header.classList.add('active');
        const onDrag = ({ movementX, movementY }) => {
            let getStyle = window.getComputedStyle(wrapper);
            let leftVal = parseInt(getStyle.left);
            let topVal = parseInt(getStyle.top);
            wrapper.style.left = `${leftVal + movementX}px`;
            wrapper.style.top = `${topVal + movementY}px`;
        };
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', () => {
            header.classList.remove('active');
            document.removeEventListener('mousemove', onDrag);
        }, { once: true });
    });
}

// Function to add task functionality to the to-do list
function addTaskFunctionality(wrapper) {
    const addTaskButton = wrapper.querySelector('.new-task button');
    const taskInput = wrapper.querySelector('.new-task input');
    const taskList = wrapper.querySelector('#list');

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const taskItem = document.createElement('li');
            taskItem.textContent = taskText;
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fa-duotone fa-solid fa-check"></i>';
            deleteButton.addEventListener('click', () => {
                taskItem.classList.toggle('completed');
            });
            taskItem.appendChild(deleteButton);
            taskList.appendChild(taskItem);
            taskInput.value = '';
            taskInput.focus();
        }
    });
}

// Add To-Do List
document.querySelectorAll('.todo-icon')[0].addEventListener('click', () => {
    const newWrapper = document.createElement('div');
    newWrapper.classList.add('wrapper');
    newWrapper.innerHTML = `
        <div class="header"><input type="text" name="" value="To-Do List" id="todo-name"><button class="close-btn"><i class="fa-solid fa-close"></i></button></div>
        <hr>
        <div class="content">
            <ul id="list"></ul>
            <div class="new-task">
                <input type="text"> <button><i class="fa-solid fa-plus icon"></i></button>
            </div>
        </div>
    `;
    main.appendChild(newWrapper);
    addDragAndCloseFunctionality(newWrapper);
    addTaskFunctionality(newWrapper);
});



// Add Calendar
document.addEventListener('DOMContentLoaded', () => {
    const calendarOption = document.getElementById('calendar-option');
    const main = document.getElementById('main');

    // Show floating calendar when "Calendar" is clicked
    calendarOption.addEventListener('click', (event) => {
        event.preventDefault();
        createCalendarWidget();
    });

    // Create a new calendar widget
    function createCalendarWidget() {
        const template = document.getElementById('template-calendar');
        if (template) {
            const clone = template.cloneNode(true);
            clone.id = `calendar-${Date.now()}`; // Unique ID for each clone
            clone.classList.remove('hidden');
            clone.classList.add('floating-calendar');
            main.appendChild(clone);
            makeDraggable(clone); // Make the new calendar draggable

            // Add close button functionality
            const closeBtn = clone.querySelector('.close-btn');
            closeBtn.addEventListener('click', () => {
                main.removeChild(clone);
            });
        }
    }

    // Make floating elements draggable
    function makeDraggable(element) {
        let isDragging = false;
        let offsetX, offsetY;

        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', () => {
                isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
            });
        });

        function onMouseMove(e) {
            if (isDragging) {
                element.style.left = `${e.clientX - offsetX}px`;
                element.style.top = `${e.clientY - offsetY}px`;
            }
        }
    }
});

// Add Stopwatch
document.querySelectorAll('.todo-icon')[2].addEventListener('click', () => {
    const newWrapper = document.createElement('div');
    newWrapper.classList.add('wrapper');
    newWrapper.innerHTML = `
        <div class="header stopwatch"><input type="text" name="" value="StopWatch" id="todo-name"><button class="close-btn"><i class="fa-solid fa-close"></i></button></div>
        <hr>
        <div class="content stopwatch-content">
            <div id="stopwatch">00:00:00</div>
            <div>
                <button id="stopStopwatch" disabled><i class="fa-solid fa-stop"></i></button>
                <button id="startStopwatch"><i class="fa-solid fa-play"></i></button>
                <button id="resetStopwatch" disabled><i class="fa-solid fa-rotate-right fa-rotate-270"></i></button>
            </div>
        </div>
    `;
    main.appendChild(newWrapper);
    addDragAndCloseFunctionality(newWrapper);

    let stopwatchInterval;
    let elapsedSeconds = 0;

    const stopwatchDisplay = newWrapper.querySelector('#stopwatch');
    const startBtn = newWrapper.querySelector('#startStopwatch');
    const stopBtn = newWrapper.querySelector('#stopStopwatch');
    const resetBtn = newWrapper.querySelector('#resetStopwatch');

    startBtn.addEventListener('click', () => {
        stopwatchInterval = setInterval(() => {
            elapsedSeconds++;
            stopwatchDisplay.textContent = new Date(elapsedSeconds * 1000).toISOString().substr(11, 8);
        }, 1000);
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resetBtn.disabled = false;
    });

    stopBtn.addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        elapsedSeconds = 0;
        stopwatchDisplay.textContent = '00:00:00';
        startBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.disabled = true;
    });
});

// Add Timer
document.querySelectorAll('.todo-icon')[3].addEventListener('click', () => {
    const newWrapper = document.createElement('div');
    newWrapper.classList.add('wrapper');
    newWrapper.innerHTML = `
        <div class="header timer"><input type="text" name="" value="Timer" id="todo-name"><button class="close-btn"><i class="fa-solid fa-close"></i></button></div>
        <hr>
        <div class="content timer-content">
            <input type="number" id="timerInput" placeholder="Minutes">
            <div id="timerDisplay">00:00</div>
            <div>
                <button id="startTimer"><i class="fa-solid fa-play"></i></button>
                <button id="stopTimer" disabled><i class="fa-solid fa-stop"></i></button>
            </div>
        </div>
    `;
    main.appendChild(newWrapper);
    addDragAndCloseFunctionality(newWrapper);

    let timerInterval;
    let timeRemaining = 0;

    const timerDisplay = newWrapper.querySelector('#timerDisplay');
    const timerInput = newWrapper.querySelector('#timerInput');
    const startBtn = newWrapper.querySelector('#startTimer');
    const stopBtn = newWrapper.querySelector('#stopTimer');

    startBtn.addEventListener('click', () => {
        timeRemaining = parseInt(timerInput.value) * 60;
        if (isNaN(timeRemaining) || timeRemaining <= 0) {
            alert('Please enter a valid number of minutes.');
            return;
        }

        timerInterval = setInterval(() => {
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                alert('Time\'s up!');
            } else {
                timeRemaining--;
                timerDisplay.textContent = new Date(timeRemaining * 1000).toISOString().substr(14, 5);
            }
        }, 1000);
        startBtn.disabled = true;
        stopBtn.disabled = false;
    });

    stopBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });
});

// Function to generate a random number within a range
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to create stars
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars-container');
    document.body.appendChild(starsContainer);

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('stars');
        star.style.left = `${getRandomNumber(0, window.innerWidth)}px`;
        star.style.top = `${getRandomNumber(0, window.innerHeight)}px`;
        star.style.animationDelay = `${getRandomNumber(0, 2)}s`;
        star.style.animationDuration = `${getRandomNumber(1, 3)}s`;
        starsContainer.appendChild(star);
    }
}

// Create stars when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', createStars);
document.getElementById('note-icon').addEventListener('click', () => {
    console.log('test');
    const newWrapper = document.createElement('div');
    newWrapper.classList.add('wrapper');
    newWrapper.innerHTML = `
        <div class="header">
            <input type="text" name="" value="Note" id="todo-name">
            <button class="close-btn"><i class="fa-solid fa-close"></i></button>
        </div>
        <hr>
        <div class="note-content">
            <textarea id="note-space" style="width: 100%; height: 300px;"></textarea>
        </div>
    `;
    main.appendChild(newWrapper);
    addDragAndCloseFunctionality(newWrapper);
});
