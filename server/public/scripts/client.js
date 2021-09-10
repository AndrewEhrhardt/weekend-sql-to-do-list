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

function postTask(){
    console.log('in post task');
    let taskToAdd = {
        task: $('#task-input').val()
    }
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

function getTasks(){
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log(response);
        appendTasksToDom(response);
    }).catch(function(error){
        console.log('error in GET', error);
    });
}

function appendTasksToDom(response){
    console.log(response);
    $('#task-list').empty();
    for (task of response)
        $('#task-list').append(`
        <tr>
        <td class="${(task.completed ? "completed": "")}">${task.task}</td>
        <td> 
            <input type="checkbox" data-id="${task.id}" class="completed-toggle" ${(task.completed ? "checked": "")}>
        </td>
        <td>
            <button data-id="${task.id}" class="delete-button">
            Delete
            </button>
        </td>
        </tr>
    `)
}

function toggleCompleted(){
    const taskId = $(this).data('id');
    const toggleState = {};
    if ($(this).attr('checked') == "checked"){ //checks if the box is checked 
        toggleState.toggle = false; //since the checkbox is being unchecked, the task completed status will now be false 
    } else {
        toggleState.toggle = true; //since box is being checked, task completed will now be set to true
    }
    console.log(toggleState.toggle);
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

function deleteTask(){
    const taskId = $(this).data('id');
    console.log(taskId);
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