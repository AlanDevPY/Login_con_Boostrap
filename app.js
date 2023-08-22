document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const areaInput = document.getElementById("areaInput");
    const solicitudInput = document.getElementById("solicitudInput");
    const deQuienInput = document.getElementById("deQuienInput");
    const pendingTasksList = document.getElementById("pendingTasksList");
    const completedTasksList = document.getElementById("completedTasksList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Función para guardar las tareas en LocalStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Función para renderizar las tareas en las listas
    function renderTasks() {
        pendingTasksList.innerHTML = "";
        completedTasksList.innerHTML = "";

        tasks.forEach((task, index) => {
            const taskCard = document.createElement("div");
            taskCard.className = `task-card ${task.completed ? 'completed' : ''}`;
            taskCard.innerHTML = `
                <div class="task-date">${formatDate(task.dateAdded)}</div>
                <div class="task-text"><b>Área:</b> ${task.area}</div>
                <div class="task-text"><b>Solicitud:</b> ${task.solicitud}</div>
                <div class="task-text"><b>De quién recibí la solicitud:</b> ${task.deQuien}</div>
                <div>
                    ${!task.completed ? `<button class="btn btn-sm btn-success btn-edit" data-index="${index}">Terminado</button>` : ''}
                    <button class="btn btn-sm btn-danger btn-delete" data-index="${index}">Eliminar</button>
                </div>
            `;

            if (task.completed) {
                taskCard.innerHTML += `<div class="task-date"><b>Fecha de terminación:</b> ${formatDate(task.dateCompleted)}</div>`;
                completedTasksList.appendChild(taskCard);
            } else {
                pendingTasksList.appendChild(taskCard);
            }
        });

        // Agregar eventos de clic a los botones
        const deleteButtons = document.querySelectorAll(".btn-delete");
        const completedButtons = document.querySelectorAll(".btn-edit");

        deleteButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const index = button.getAttribute("data-index");
                deleteTask(index);
            });
        });

        completedButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const index = button.getAttribute("data-index");
                markAsCompleted(index);
            });
        });
    }

    // Función para agregar una nueva tarea
    function addTask(area, solicitud, deQuien) {
        const newTask = {
            area: area,
            solicitud: solicitud,
            deQuien: deQuien,
            completed: false,
            dateAdded: new Date().getTime(),
            dateCompleted: null
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
    }

    // Función para marcar una tarea como completada
    function markAsCompleted(index) {
        tasks[index].completed = true;
        tasks[index].dateCompleted = new Date().getTime();
        saveTasks();
        renderTasks();
    }

    // Función para eliminar una tarea
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    // Función para formatear la fecha como "YYYY-MM-DD HH:mm"
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    // Event listener para el formulario
    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const area = areaInput.value.trim();
        const solicitud = solicitudInput.value.trim();
        const deQuien = deQuienInput.value.trim();
        if (area !== "" && solicitud !== "" && deQuien !== "") {
            addTask(area, solicitud, deQuien);
            areaInput.value = "";
            solicitudInput.value = "";
            deQuienInput.value = "";
        }
    });

    // Initial rendering de las tareas
    renderTasks();
});