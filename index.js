// require all necessities
const inquirer = require("inquirer");
const {writeFile} = require("./utils/generateHTML");
const generateIndexHTML = require("./src/htmlTemplate");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const validator = require("email-validator");

// create an empty array that we will be filling based on user input
const teamArray = [];

// questions that we'll be asking for the team's manager
const questionsManager = [
    {
        type: "input",
        name: "nameManager",
        message: "What is the Manager's name?",
        validate: nameInput => {
            if (nameInput) {
                return true;
            }
            else {
                return console.log('\x1b[31m', " You must enter a name!");
            }
        }
    },
    {
        type: "input",
        name: "idManager",
        message: "What is the Manager's employee ID?",
        validate: idInput => {
            if (!isNaN(idInput)) {
                return true;
            }
            else {
                return console.log('\x1b[31m', " You must enter a number for the manager's ID");
            }
        }
    },
    {
        type: "input",
        name: "emailManager",
        message: "What is the Manager's email address?",
        validate: emailInput => {
            if (validator.validate(emailInput)) {
                return true;
            }
            else {
                return console.log('\x1b[31m', " You must enter a valid email address!");
            }
        }
    },
    {
        type: "input",
        name: "officeManager",
        message: "What is the Manager's office number?",
        validate: officeInput => {
            if (!isNaN(officeInput)) {
                return true;
            }
            else {
                return console.log('\x1b[31m', " You must enter a number for the manager's office number!");
            }
        }
    }
];

// questions that we'll be asking for each engineer a user wants to add
const questionsEngineer = [
    {
        type: "input",
        name: "nameEngineer",
        message: "What is the Engineer's name?",
        validate: nameInput => {
            if (nameInput) {
                return true;
            }
            else {
                return console.log('\x1b[31m', " You must enter a name!");
            }
        }
    },
    {
        type: "input",
        name: "idEngineer",
        message: "What is the Engineer's employee ID?",
        validate: idInput => {
            let idChecker = teamArray.some(obj => obj.id === idInput);

            if (!isNaN(idInput) && !idChecker) {
                return true;
            }
            else if (idChecker) {
                return console.log('\x1b[31m', " You must enter a unique id for every employee!");
            }
            else {
                return console.log('\x1b[31m', " You must enter a number for the Engineer's ID");
            }
        }
    },
    {
        type: "input",
        name: "emailEngineer",
        message: "What is the Engineer's email address?",
        validate: emailInput => {
            let emailChecker = teamArray.some(obj => obj.email === emailInput);

            if (validator.validate(emailInput) && !emailChecker) {
                return true;
            }
            else if (emailChecker) {
                return console.log('\x1b[31m', " You must enter a unique email for every employee!");
            }
            else {
                return console.log('\x1b[31m', " You must enter a valid email address!");
            }
        }
    },
    {
        type: "input",
        name: "githubEngineer",
        message: "What is the Engineer's GitHub username?",
        validate: githubInput => {
            let githubChecker = teamArray.some(obj => obj.github === githubInput);

            if (githubInput && !githubChecker) {
                return true;
            }
            else if (githubChecker) {
                return console.log('\x1b[31m', " You must enter a unique GitHub username for every engineer!");
            }
            else {
                return console.log('\x1b[31m', " You must enter a GitHub username!");
            }
        }
    }
];

// questions we'll be asking for each intern a user wants to add
const questionsIntern = [
    {
        type: "input",
        name: "nameIntern",
        message: "What is the Intern's name?",
        validate: nameInput => {
            if (nameInput) {
                return true;
            }
            else {
                return console.log('\x1b[31m', " You must enter a name!");
            }
        }
    },
    {
        type: "input",
        name: "idIntern",
        message: "What is the Intern's employee ID?",
        validate: idInput => {
            let idChecker = teamArray.some(obj => obj.id === idInput);

            if (!isNaN(idInput) && !idChecker) {
                return true;
            }
            else if (idChecker) {
                return console.log('\x1b[31m', " You must enter a unique id for every employee!");
            }
            else {
                return console.log('\x1b[31m', " You must enter a number for the Intern's ID");
            }
        }
    },
    {
        type: "input",
        name: "emailIntern",
        message: "What is the Intern's email address?",
        validate: emailInput => {
            let emailChecker = teamArray.some(obj => obj.email === emailInput);

            if (validator.validate(emailInput) && !emailChecker) {
                return true;
            }
            else if (emailChecker) {
                return console.log('\x1b[31m', " You must enter a unique email for every employee!");
            }
            else {
                return console.log('\x1b[31m', " You must enter a valid email address!");
            }
        }
    },
    {
        type: "input",
        name: "schoolIntern",
        message: "What school is the Intern attending?",
        validate: schoolInput => {
            if (schoolInput) {
                return true;
            }
            else {
                return console.log('\x1b[31m', " You must enter a school for the Intern!");
            }
        }
    }
];

// menu question after they've added each member
const questionsNewMember = [
    {
        type: "list",
        name: "newMember",
        message: "Please select a new member to add to your team.",
        choices: [
            "Add an Engineer",
            "Add an Intern",
            "I'm finished building my Team Profile"
        ]
    }
];

// function to prompt the user to enter a manager
const promptUserManager = () => {
    inquirer.prompt(questionsManager)
    .then(answers => {
        const manager = new Manager(answers.nameManager, answers.idManager, answers.emailManager, answers.officeManager);
        teamArray.push(manager);
        addMember();
    })
    .catch(err => {
        console.log(err);
    });
};

// function to prompt the user to enter an engineer
const promptUserEngineer = () => {
    inquirer.prompt(questionsEngineer)
    .then(answers => {
        const engineer = new Engineer(answers.nameEngineer, answers.idEngineer, answers.emailEngineer, answers.githubEngineer);
        teamArray.push(engineer);
        addMember();
    })
    .catch(err => {
        console.log(err);
    });
};

// function to prompt the user to enter an intern
const promptUserIntern = () => {
    inquirer.prompt(questionsIntern)
    .then(answers => {
        const intern = new Intern(answers.nameIntern, answers.idIntern, answers.emailIntern, answers.schoolIntern);
        teamArray.push(intern);
        addMember();
    })
    .catch(err => {
        console.log(err);
    });
};

// function to prompt the user to add another member or leave
const addMember = () => {
    inquirer.prompt(questionsNewMember)
    .then(answers => {
        switch(answers.newMember) {
            case "Add an Engineer":
                promptUserEngineer();
                break;
            case "Add an Intern":
                promptUserIntern();
                break;
            case "I'm finished building my Team Profile":
                finishHTML();
                break;
        }
    })
};

// function to finish the application and generate the index.html based on prompt answers
const finishHTML = () => {
    writeFile(generateIndexHTML(teamArray))
    .then(writeFileResponse => {
        console.log('\x1b[32m', writeFileResponse.message),
        '\n';
        console.log('\x1b[32m', "You can find your new Team Profile index.html in the 'dist' folder!");
    })
    .catch(err => {
        console.log(err);
    });
};

// run this on start to prompt the user to enter a manager
promptUserManager();