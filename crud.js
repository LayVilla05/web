function getCookie(name){ 
    const cookies = document.cookie.split(';');
    console.log(cookies)
    for (const cookie of cookies){
        const [cookieName , cookieValue] = cookie.split('=');
        if (cookieName === name) {
                return decodeURIComponent(cookieValue);
        }
    }
    return null;
}


function setCookie(name, value,days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 *1000);
    document.cookie  = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
}

function loadEmployees(){
    const employeesCookie = getCookie('employees');
    return employeesCookie ? JSON.parse(employeesCookie) : [];
}

function saveEmployees(){
    setCookie('employees' , JSON.stringify(employees),30);
}

const form = document.getElementById('employee-form');
const nameInput = document.getElementById('employee-name');
const positionInput = document.getElementById('employee-position');
const hireDateInput = document.getElementById('employee-hireDate');
const employeesList = document.getElementById('employees-list');
const editingIndexInput = document.getElementById('editing-index');
const submitBtn = document.getElementById('submit-btn');


let employees = loadEmployees();

function renderEmployees(){
    employeesList.innerHTML = "";
    employees.forEach((employee, index) => {
        employeesList.innerHTML +=
         `<tr>
            <td>${(index + 1).toString().padStart(3,'0')}</td>
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.hireDate}</td>
            <td>
                <button class="btn btn-success btn-sm " onclick= "editEmployee(${index})" >Edit</button>
                <button class="btn btn-danger btn-sm " onclick= "deleteEmployee(${index})">Delete</button>
            </td>
        </tr>`;
    });
}; 


form.addEventListener('submit' , (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const position = positionInput.value.trim();
    const hireDate = hireDateInput.value.trim();
    const editEmployee = editingIndexInput.value.trim();

    if (name && position && hireDate){
        const newEmployee = {name , position ,hireDate}; 
        if (editEmployee) {
            employees[editEmployee] = newEmployee;
            submitBtn.textContent = 'Add Employee';
            editingIndexInput.value = '';

        } else {
            employees.push(newEmployee);
        }

        nameInput.value = '';
        positionInput.value = '';
        hireDateInput.value = '';

        saveEmployees();
        renderEmployees();
    }
});


window.deleteEmployee = (index) => {
    if (confirm('Are you sure you want to deleted this employee?')) {
        employees.splice(index , 1);
        saveEmployees();
        renderEmployees();
    }
};

window.editEmployee = (index) => {
    let val = employees
    submitBtn.textContent = 'Edit Employee';
    nameInput.value= val[index].name;
    positionInput.value = val[index].position;
    hireDateInput.value = val[index].hireDate;
    editingIndexInput.value = index;

};

renderEmployees();

