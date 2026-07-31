const _newTaskBtn = document.getElementById("NewTaskBtn");
const _taskInput = document.getElementById("TaskInput");
const _newPageBtn = document.getElementById("NewPageBtn");
const _newPageInput = document.getElementById("pageNameInput");
const _deletingBtn = document.getElementById("DeletingBtn");
const _reset = document.getElementById("Reset")
let TaskPages = [{Name: "", Contents: []}];
let buttons = []
let _currentPageIndex = 0;
let _deleting = false;
if (loadTasks()){
  console.log(TaskPages);
  TaskPages.forEach((page, index) => {
    const btn = createPageButton(page.Name, index);
  if (index === 0) {
    selectPage(0);
    console.log("GGGGG");
  }
  });
  renderTasks();
}
else{
  createPageButton("Tasks", 0);
  TaskPages[0].Name = "Tasks";
}
_newTaskBtn.addEventListener("click", () => {
    if (_taskInput.value == ""){return;}
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = _taskInput.value;
    li.appendChild(span);
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
    TaskPages[_currentPageIndex].Contents.push(task);
    console.log(TaskPages)
    _taskInput.value = "";
    saveTasks();
    checkbox.addEventListener('click', () => {
        task.checked = checkbox.checked;
        li.classList.toggle('completed', checkbox.checked);
        saveTasks();
    })
    btn.addEventListener('click', () => {
        const i = TaskPages[_currentPageIndex].Contents.indexOf(task);
        TaskPages[_currentPageIndex].Contents.splice(i, 1);
        li.remove();
        saveTasks();
      });
})

_deletingBtn.addEventListener("click", () => {
  _deleting = !_deleting;
  if (_deleting){_deletingBtn.classList.add('selected');}
  else{_deletingBtn.classList.remove('selected');}
})

_newPageBtn.addEventListener("click", () => {
    console.log("HE><LLLLLLOL?!?")
    const newPageBtn = document.createElement('button');
    newPageBtn.textContent = _newPageInput.value;
    document.getElementById('pagesSetup').prepend(newPageBtn);
    let index = TaskPages.length;
    _currentPageIndex = index;
    buttons.splice(index, 0, newPageBtn);
    console.log(index);
    TaskPages[_currentPageIndex] = {Name: _newPageInput.value, Contents: []};
    selectPage(index);
    saveTasks();
    let myButton = newPageBtn;
    newPageBtn.addEventListener('click', () => {
      index = buttons.indexOf(newPageBtn);
      if (!_deleting){
        selectPage(index);
      }
      else{
        if (TaskPages.length > 1)
        {
          newPageBtn.remove();
          buttons.splice(index, 1)
          TaskPages.splice(index, 1);
          if (index == _currentPageIndex){
            let nextIndex = index;
            if (!buttons[nextIndex]){nextIndex -= 1;}
            selectPage(nextIndex);
          }
          saveTasks();
        }
      }
    })
    newPageBtn.addEventListener('dblclick', () => {
      const newName = prompt("Rename page:", TaskPages[index].Name);
      console.log(newName)
      if (newName) {
        TaskPages[index].Name = newName;
        newPageBtn.textContent = newName;
        saveTasks();
      }
    });
})

function selectPage(index) {
    let btn = buttons[index];
    document.querySelectorAll('#pagesSetup button').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    _currentPageIndex = index;
    renderTasks();
  }

function createPageButton(name, index) {
    const btn = document.createElement('button');
    btn.textContent = name;
    document.getElementById('pagesSetup').prepend(btn);
    buttons.splice(index, 0, btn);
    selectPage(index);
    saveTasks();
    btn.addEventListener('click', () => {
      index = buttons.indexOf(btn);
      if (!_deleting){
        console.log(_deleting);
        selectPage(index);
      }
      else{
        if (TaskPages.length > 1)
        {
          btn.remove();
          buttons.splice(index, 1);
          TaskPages.splice(index, 1);
          if (index == _currentPageIndex){
            let nextIndex = index;
            if (!buttons[nextIndex]){nextIndex -= 1;}
            selectPage(nextIndex);
          }
          saveTasks();
        }
      }
    })
    btn.addEventListener('dblclick', () => {
      const newName = prompt("Rename page:", TaskPages[index].Name);
      console.log(newName)
      if (newName) {
        TaskPages[index].Name = newName;
        btn.textContent = newName;
        saveTasks();
      }
    });
    return btn;
  }
function loadTasks(){
  const savedData = localStorage.getItem('TaskPages')
  if (savedData){
    TaskPages = JSON.parse(savedData);
    console.log("Loaded:", TaskPages);
    return true;
  }
  else{
    return false;
  }
}
function renderTasks() {
    document.getElementById('taskList').innerHTML = "";
    TaskPages[_currentPageIndex].Contents.forEach(task => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = task.text;
      li.appendChild(span);
  
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
            saveTasks();
        })
        btn.addEventListener('click', () => {
            const i = TaskPages[_currentPageIndex].Contents.indexOf(task);
            TaskPages[_currentPageIndex].Contents.splice(i, 1);
            li.remove();
            saveTasks();
            });

            document.getElementById('taskList').appendChild(li);
        });
  }

  function saveTasks() {
    localStorage.setItem('TaskPages', JSON.stringify(TaskPages));
  }


_reset.addEventListener("click", () =>{
  TaskPages.forEach(task => {
    task.Contents.forEach(checked => {
      checked.checked = false;
    })
  })
  renderTasks();
  saveTasks();
});