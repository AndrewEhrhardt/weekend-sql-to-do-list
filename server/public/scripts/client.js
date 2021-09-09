console.log('js loaded');
$(readyNow);

function readyNow(){
    console.log('jquery loaded');
    clickListener();
    getTasks();
}

function clickListener(){
    $('#add-task').on('click', postTask)
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
}