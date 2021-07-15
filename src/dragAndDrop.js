let taskToMove = {};

export function onDrag(ev, index) {
  taskToMove = {};
  taskToMove.dragIndex = index;
  console.log(`Moving item ${taskToMove.dragIndex}`);
}

export function onDragEnter(ev, index) {
  ev.preventDefault();
  let zones = document.getElementsByClassName('box');
  for(let i = 0; i < zones.length; i++) {
    zones[i].classList.remove('drop-zone');
  }
  zones[index-1].classList.add('drop-zone');
  taskToMove.dropIndex = index;
}

export function onDragOver(ev) {
  ev.preventDefault();
}

export function onDrop(ev, list) {
  ev.preventDefault();
  let movingTask = list.find(task => task.index === taskToMove.dragIndex);
  list = list.filter(task => task.index !== movingTask.index);
  movingTask.index = taskToMove.dropIndex;
  if(taskToMove.dragIndex < taskToMove.dropIndex){
    list.forEach(task => {
      if(task.index > taskToMove.dragIndex && task.index <= taskToMove.dropIndex ) {
        task.index--;
      }
    });
  }else if(taskToMove.dragIndex > taskToMove.dropIndex) {
    list.forEach(task => {
      if(task.index < taskToMove.dragIndex && task.index >= taskToMove.dropIndex ) {
        task.index++;
      }
    });
  }
  list = list.concat(movingTask);
  console.log(list);
}