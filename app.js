const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Array holding all created employees
const employees = [];
// Array holding users responses to questions
const questionAnswers = [];

customizeTeam();

// Questions for creating employee
const employeeQuestions = [
    {
        type: "input",
        message: 'What is the employee name?',
        name: "employeeName"
    },
    {
        type: "input",
        message: 'What is the employee id number?',
        name: "employeeId"
    },
    {
        type: "input",
        message: 'What is the employee email address?',
        name: "employeeEmail"
    }
];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// A function that will be used recursively to aask user if they want to add a team member
function customizeTeam() {
    // Empties array to get rid of old answers
    questionAnswers.length = 0;

    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "Which team member would you like to create?",
        choices: ["Create a manager", "Create an engineer", "Create an intern", "Quit"]
    }).then(function ({ choice }) {
        switch (choice) {
            case "Create a manager":
                createManager();
                break;

            case "Create an engineer":
                createEngineer();
                break;

            case "Create an intern":
                createIntern();
                break;

            default:
                console.log("Check out your team!")
                createHtml()
                break;
        }
    })
}

function createManager() {
    console.log('Manager function');

    inquirer.prompt(employeeQuestions).then(function (data) {
        questionAnswers.push(data.employeeName, data.employeeId, data.employeeEmail)
        officePrompt();

    })
}

// Used when creating manager to get additional info specific only to manager
function officePrompt() {
    inquirer.prompt({
        type: "input",
        message: 'What is the office number of the manager?',
        name: "officeNumber"

    }).then(function (data) {

        questionAnswers.push(data.officeNumber)
        const manager = new Manager(questionAnswers[0], questionAnswers[1], questionAnswers[2], questionAnswers[3]);
        employees.push(manager);
        console.log(employees);
        customizeTeam();
    })
}

function createEngineer() {
    console.log('Engineer function');

    inquirer.prompt(employeeQuestions).then(function (data) {
        questionAnswers.push(data.employeeName, data.employeeId, data.employeeEmail)
        githubPrompt();

    })
}

// Used when creating engineer to get additional info specific only to engineer
function githubPrompt() {
    inquirer.prompt({
        type: "input",
        message: 'What is the github username of engineer?',
        name: "github"

    }).then(function (data) {

        questionAnswers.push(data.github)
        const engineer = new Engineer(questionAnswers[0], questionAnswers[1], questionAnswers[2], questionAnswers[3]);
        employees.push(engineer);
        console.log(employees);
        customizeTeam();
    })
}

function createIntern() {
    console.log('Intern function');

    inquirer.prompt(employeeQuestions).then(function (data) {
        questionAnswers.push(data.employeeName, data.employeeId, data.employeeEmail);
        schoolPrompt()
    })
}

// Used when creating interns to get additional info specific only to interns
function schoolPrompt() {
    inquirer.prompt({
        type: "input",
        message: 'What school does intern attend?',
        name: "school"
    }).then(function (data) {

        questionAnswers.push(data.school)
        const intern = new Intern(questionAnswers[0], questionAnswers[1], questionAnswers[2], questionAnswers[3]);
        employees.push(intern);
        console.log(employees);
        customizeTeam();
    })
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
function createHtml() {
    const data = render(employees);

    // After you have your html, you're now ready to create an HTML file using the HTML
    // returned from the `render` function. Now write it to a file named `team.html` in the
    // `output` folder. You can use the variable `outputPath` above target this location.
    fs.writeFileSync(outputPath, data)
}