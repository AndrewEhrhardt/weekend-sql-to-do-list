console.log('js loaded');
$(readyNow);

function readyNow(){
    console.log('jquery loaded');
    clickListener();
    getTasks();
}

function clickListener(){
    $('#add-task').on('click', postTask)
    $('#task-list').on('click', '.completed-toggle', toggleCompleted)
    $('#task-list').on('click', '.delete-button', deleteTask)
}

//sends a task to be added to the database 
function postTask(){
    let taskToAdd = {
        task: $('#task-input').val()
    }
    $('#task-input').val('');
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskToAdd,
        }).then(function(response) {
            console.log('Response from server.', response);
            getTasks();
        }).catch(function(error) {
            console.log('Error in POST', error)
            alert('Cannot add task at this time.');
        });
}

//gets the tasks
function getTasks(){
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response) {
        appendTasksToDom(response);
    }).catch(function(error){
        console.log('error in GET', error);
    });
}

//This function appends all the tasks to the dom. 
//input checkbox that is appended below will be checked if task.completed is true, 
//and the value of the box will be "false" if task.completed is true. This is the value 
//that will be sent to be put into the database in case the task needs to be unchecked.
function appendTasksToDom(response){
    $('#task-list').empty();
    for (task of response) 
        $('#task-list').append(`
        <tr>
        <td class="${(task.completed ? "completed": "")}">${task.task}</td>
        <td class="toggle-container"> 
            <input type="checkbox" data-id="${task.id}" value="${(!task.completed)}" class="completed-toggle" ${(task.completed ? "checked": "")}>
        </td>
        <td>
            <button data-id="${task.id}" class="delete-button float-right">
            Delete
            </button>
        </td>
        </tr>
    `)
}


//sends a put to update if a task has been completed,
//or if it has been changed back to uncompleted
function toggleCompleted(){
    const taskId = $(this).data('id');
    const toggleState = {toggle: $(this).val()}; //sends the true or false state to change in the database
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`,
        data: toggleState,
    }).then( function(response){
        console.log('Task Completed!')
        getTasks();
    }).catch (function (error){
        alert('Something went wrong!');
        console.log('Error in PUT', error);
    });
}


//Sends a delete to change if a task has been deleted
function deleteTask(){
    const taskId = $(this).data('id');
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`,
    }).then( function(response){
        console.log('Task removed!')
        getTasks();
    }).catch (function (error){
        alert('Something went wrong!');
        console.log('Error in DELETE', error);
    });
  }