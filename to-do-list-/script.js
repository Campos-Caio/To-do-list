const localStorageKey = 'to-do-list';

function validateIfExistsNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let inputValue = document.getElementById('input-new-task').value;
    let exists = values.find(x => x.name === inputValue);
    return !exists ? false : true;
}

function newTask() {
    let input = document.getElementById('input-new-task');
    let colorInput = document.getElementById('input-task-color');
    input.style.border = '';

    // validation
    if (!input.value) {
        input.style.border = '1px solid red';
        alert('Digite algo para inserir em sua lista');
    } else if (validateIfExistsNewTask()) {
        alert('Já existe uma task com essa descrição');
    } else {
        // increment to localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        values.push({ name: input.value, completed: false, color: colorInput.value });
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        showValues();
    }
    input.value = '';
    colorInput.value = '#000000';
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        let completedClass = values[i].completed ? 'completed' : '';
        let backgroundColor = values[i].completed ? 'var(--color-green)' : values[i].color;
        list.innerHTML += `
          <li class="${completedClass}" style="background-color: ${backgroundColor}">
            <span class="task-name">${values[i]['name']}</span>
            <div class="button-container">
                <button class="btn-edit" onclick='editItem("${values[i]['name']}")' title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zm1.415 3L10.5 1.707 14.293 5.5 13.56 6.233 10.293 3.707 2 12V13h1L12 4.707 13.56 3.146zM1 13.5V15h1.5L13.293 5.707l-1.5-1.5L1 13.5z"/>
                    </svg>
                </button>
                <button class="btn-ok" onclick='completeItem("${values[i]['name']}")' title="Concluir">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                    </svg>
                </button>
                <button class="btn-remove" onclick='removeItem("${values[i]['name']}")' title="Remover">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash-simple" viewBox="0 0 16 16">
                    <path d="M2 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1H2V4zm11 1V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5h10z"/>
                </svg>
                </button>
            </div>
          </li>`;
    }
}

function editItem(name) {
    let newName = prompt("Editar task:", name);
    if (newName && newName.trim() !== name.trim()) {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        let exists = values.some(task => task.name === newName.trim());
        if (exists) {
            alert("Já existe uma tarefa com esse nome!");
        } else {
            let index = values.findIndex(x => x.name === name);
            if (index !== -1) {
                values[index].name = newName.trim();
                localStorage.setItem(localStorageKey, JSON.stringify(values));
                showValues();
            }
        }
    }
}

function completeItem(name) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name === name);
    if (index !== -1) {
        values[index].completed = !values[index].completed;
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        showValues();
    }
}

function removeItem(name) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name === name);
    values.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
}
