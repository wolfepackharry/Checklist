const _newTaskBtn = document.getElementById("NewTaskBtn");
const _taskInput = document.getElementById("TaskInput");
const _newPageBtn = document.getElementById("NewPageBtn");
let TaskPages = [];
let _currentPageIndex = 0;
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
    TaskPages[_currentPageIndex].push({ text: _taskInput.value, checkbox: checkbox.checked});
    console.log(TaskPages)
    _taskInput.value = "";
    checkbox.addEventListener('click', () => {
        TaskPages.forEach(element => {
            if (element.checkbox == checkbox){
                element.checkbox.checked = checkbox.checked;
                console.log(TaskPages);
            }
        });
    })
    btn.addEventListener('click', () => {
        li.remove();
      });
})

//_newPageBtn.addEventListener("click", () => {
//    document.createAttribute("")
//})