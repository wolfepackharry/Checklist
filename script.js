const _newTaskBtn = document.getElementById("NewTaskBtn");
const _taskInput = document.getElementById("TaskInput");
const _newPageBtn = document.getElementById("NewPageBtn");
const _newPageInput = document.getElementById("pageNameInput");
let TaskPages = [];
let _currentPageIndex = 0;
createPageButton("Tasks", 0)
_newTaskBtn.addEventListener("click", () => {
    if (_taskInput.value == ""){return;}
    const li = document.createElement('li');
    li.textContent = _taskInput.value;
    document.getElementById('taskList').appendChild(li);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    li.appendChild(checkbox);
    const btn = document.createElement('button');
    btn.textContent = "Delete"
    li.appendChild(btn);
    //li.classList.add('task-item');
    if (!TaskPages[_currentPageIndex]) {
        TaskPages[_currentPageIndex] = [];
      }
    const task = {text : _taskInput.value, checked : checkbox.checked};
    TaskPages[_currentPageIndex].push(task);
    console.log(TaskPages)
    _taskInput.value = "";
    checkbox.addEventListener('click', () => {
        task.checked = checkbox.checked;
        li.classList.toggle('completed', checkbox.checked);
    })
    btn.addEventListener('click', () => {
        const i = TaskPages[_currentPageIndex].indexOf(task);
        TaskPages[_currentPageIndex].splice(i, 1);
        li.remove();
      });
})

_newPageBtn.addEventListener("click", () => {
    console.log("HE><LLLLLLOL?!?")
    const newPageBtn = document.createElement('button');
    newPageBtn.textContent = _newPageInput.value;
    document.getElementById('pagesSetup').prepend(newPageBtn);
    const index = TaskPages.length;
    _currentPageIndex = index;
    console.log(index);
    TaskPages[_currentPageIndex] = [];
    selectPage(index, newPageBtn);
    newPageBtn.addEventListener('click', () => {
        selectPage(index, newPageBtn);
    })
})

function selectPage(index, btn) {
    document.querySelectorAll('#pagesSetup button').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    _currentPageIndex = index;
    renderTasks();
  }

function createPageButton(name, index) {
    const btn = document.createElement('button');
    btn.textContent = name;
    document.getElementById('pagesSetup').prepend(btn);
    TaskPages[0] = [];
    selectPage(index, btn);
    btn.addEventListener('click', () => {
      selectPage(index, btn);
    });
  }

function renderTasks() {
    document.getElementById('taskList').innerHTML = "";
    TaskPages[_currentPageIndex].forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.text;
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.checked;
      li.classList.toggle('completed', checkbox.checked);
      li.appendChild(checkbox);
  
      const btn = document.createElement('button');
        btn.textContent = "Delete"
        li.appendChild(btn);
        //li.classList.add('task-item');
        checkbox.addEventListener('click', () => {
            task.checked = checkbox.checked;
            li.classList.toggle('completed', checkbox.checked);
        })
        btn.addEventListener('click', () => {
            const i = TaskPages[_currentPageIndex].indexOf(task);
            TaskPages[_currentPageIndex].splice(i, 1);
            li.remove();
            });

            document.getElementById('taskList').appendChild(li);
        });
  }