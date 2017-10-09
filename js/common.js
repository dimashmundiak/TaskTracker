function deleteTask(id) {
    fetch('tasks/' + id, {
        method: 'delete'
    })
        .then(show());
}

function show() {
    fetch('/tasks')
        .then(function (response) {
            return response.json();
        })
        .then(function (tasks) {
            console.log(tasks);
            var html = '<thead><tr><th>Name</th><th>Description</th><th>Delete</th></tr></thead><tbody>';
            for (var i = 0, len = tasks.length; i < len; i++) {
                var task = tasks[i];
                var deleteButton = '<button class=\'btn btn-danger\' onclick="deleteTask(\'' + task._id + '\')">x</button>'
                html += '<tr>' + '<td>' + tasks[i].name + '</td>' + '<td>' + tasks[i].description + '</td>' + '<td>' + deleteButton + '</td>' + '</tr>';
            }
            html += '</tbody>'
            document.getElementById('tasks').innerHTML = html;
        });
};

function createTask() {
    var taskName = document.getElementById('taskName').value;
    var taskValue = document.getElementById('taskDescription').value;
    fetch('tasks', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: taskName, description: taskValue })
    })
        .then(show());
    return false;
};

show();