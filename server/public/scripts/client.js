console.log('js loaded');
$(readyNow);

function readyNow(){
    console.log('jquery loaded');
    clickListener();
    getTasks();
}

function clickListener(){
    $('#add-task').on('click', postTask)
    $('#task-list').on('click', '.mark-completed-button', markCompleted)
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
        <td>${task.task}</td>
        <td>${task.completed ? "":
            `<button data-id="${task.id}" class="mark-completed-button">
                 Completed
            </button>` 
        }
        <td>
            <button data-id="${task.id}" class="delete-button">
            Delete
            </button>
        </td>
        </tr>
    `)
}

function markCompleted(){
    const taskId = $(this).data('id');
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`,
    }).then( function(response){
        console.log('Task Completed!')
        getTasks();
    }).catch (function (error){
        alert('Something went wrong!');
        console.log('Error in PUT', error);
    });
}