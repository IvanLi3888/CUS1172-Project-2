const tasks = [["Do a Thing", "low", "pending"]];


document.addEventListener('DOMContentLoaded', () => {
    tasks.forEach(item => addTodoList(item));
}
);

document.addEventListener('DOMContentLoaded', () => {

    document.querySelector("#add-task").onsubmit = function (event) {

        if (findDuplicateTask(document.getElementById("task-title").value)) {
            alert("Error: Task name already exists.");
        } else {
            addTodoArray(
                document.getElementById("task-title").value,
                document.getElementById("task-priority").value,
                document.querySelector('input[name=optradio]:checked').value
            );
        }


        return false;
    };

});
// TODO 
// - make site better graphics
function removeTask(name) {
    const index = tasks.findIndex(task => task[0] === name);
    if (index !== -1) {
        tasks.splice(index, 1);
        console.log("After delete: "+tasks);
    }
}

function findDuplicateTask(name) {
    return tasks.find(task => task[0] === name); // returns true if finds duplicate
}

function completeTask(name) {
    const index = tasks.findIndex(task => task[0] === name);

    if (index !== -1) {
        tasks[index][2] = "complete";
        const taskList = document.getElementById("task-list");
        const li = taskList.children[index];
        const text = li.querySelector("span");

        if (tasks[index][1] == "low") {
            var priority = "Low Priority";
        } else if (tasks[index][1] == "medium") {
            var priority = "Medium Priority";
        } else if (tasks[index][1] == "high") {
            var priority = "High Priority";
        }

        text.textContent = `${tasks[index][0]}, ${priority}, Completed`;
        text.style.textDecoration = "line-through";
    } else{
        console.log("Error: did not find");
    }
} 



function addTodoArray(name, priority, status) {
    let newArray = [name, priority, status];

    tasks.push(newArray);
    console.log("After push:" + tasks);
    addTodoList(newArray);
}

function addTodoList(array) {
    var list = document.getElementById("task-list");


    var li = document.createElement("li");


    if (array[1] == "low") {
        var priority = "Low Priority";
    } else if (array[1] == "medium") {
        var priority = "Medium Priority";
    } else if (array[1] == "high") {
        var priority = "High Priority";
    }

    if (array[2] == "pending") {
        var status = "Pending";
    } else if (array[2] == "completed") {
        var status = "Completed";
    }

    const text = document.createElement("span");
    text.textContent = array[0] + ", " + priority + ", " + status;
    li.className = "list-group-item";

    if(array[2] == "completed"){
        text.style.textDecoration = "line-through";
    }

    li.appendChild(text);

    var br = document.createElement("br");
    li.appendChild(br);

    var remove = document.createElement("button");
    remove.className = "button-remove";
    remove.textContent = "Remove";
    li.appendChild(remove);

    var complete = document.createElement("button");
    complete.className = "button-complete";
    complete.textContent = "Mark as Complete";
    li.appendChild(complete);

    list.appendChild(li);

    remove.addEventListener('click', function () {
        list.removeChild(li); // removes from view
        removeTask(array[0]); // removes from array
        console.log(tasks);
    })

    complete.addEventListener('click', function () {
        completeTask(array[0]);
    })

}









