// 4_1.js
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// helper function to ask questions
function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
}

// employee data storage
let employees = [];

// menu handler
async function handleMenu() {
  console.log(`
Employee Management System
1. Add Employee
2. List Employees
3. Search Employee
4. Update Employee
5. Delete Employee
6. Exit
  `);

  const choice = await ask("Choose an option: ");

  switch (choice.trim()) {
    case "1":
      await addEmployee();
      break;
    case "2":
      listEmployees();
      break;
    case "3":
      await searchEmployee();
      break;
    case "4":
      await updateEmployee();
      break;
    case "5":
      await deleteEmployee();
      break;
    case "6":
      console.log("Exiting...");
      rl.close();
      return;
    default:
      console.log("Invalid choice, try again.");
  }

  handleMenu(); // show menu again
}

// add employee
async function addEmployee() {
  const name = await ask("Enter name: ");
  const id = await ask("Enter ID: ");
  const role = await ask("Enter role: ");

  employees.push({ id, name, role });
  console.log("Employee added successfully!");
}

// list employees
function listEmployees() {
  if (employees.length === 0) {
    console.log("No employees found.");
    return;
  }
  console.log("\nEmployee List:");
  employees.forEach((emp, index) => {
    console.log(`${index + 1}. ID: ${emp.id}, Name: ${emp.name}, Role: ${emp.role}`);
  });
}

// search employee
async function searchEmployee() {
  const searchId = await ask("Enter employee ID to search: ");
  const emp = employees.find((e) => e.id === searchId);

  if (emp) {
    console.log(`Found: ID: ${emp.id}, Name: ${emp.name}, Role: ${emp.role}`);
  } else {
    console.log("Employee not found.");
  }
}

// update employee
async function updateEmployee() {
  const updateId = await ask("Enter employee ID to update: ");
  const emp = employees.find((e) => e.id === updateId);

  if (emp) {
    emp.name = await ask("Enter new name: ");
    emp.role = await ask("Enter new role: ");
    console.log("Employee updated successfully!");
  } else {
    console.log("Employee not found.");
  }
}

// delete employee
async function deleteEmployee() {
  const deleteId = await ask("Enter employee ID to delete: ");
  const index = employees.findIndex((e) => e.id === deleteId);

  if (index !== -1) {
    employees.splice(index, 1);
    console.log("Employee deleted successfully!");
  } else {
    console.log("Employee not found.");
  }
}

// start program
handleMenu();