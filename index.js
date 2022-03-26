"use strict";

const inquirer = require("inquirer");

// const chalkPipe = require('chalk-pipe');
const fs = require("fs");

const questions = [
    {
        type: "input",
        name: "user_name",
        message: "What's your name",
    },
    {
        type: "input",
        name: "location",
        message: "Where are you located?",
    },
    {
        type: "input",
        name: "bio",
        message: "Please enter a few sentances about yourself",
    },
    {
        type: "input",
        name: "linkedin",
        message: "What is your LinkedIn URL",
    },
    {
        type: "input",
        name: "github",
        message: "What is your GitHub URL",
    },
    {
        type: "input",
        name: "email",
        message: "Please enter an email address where you can be reached",
    },
    {
        type: "checkbox",
        name: "languages",
        message: "What programming languages do you know?",
        choices: [
            new inquirer.Separator(" = Languages = "),
            {
                name: "Javascript",
            },
            {
                name: "HTML",
            },
            {
                name: "CSS",
            },
        ],
    },
    {
        type: "input",
        name: "img_link",
        message: "Provide a hosted link to your profile image",
    },
];

inquirer.prompt(questions).then((answers) => {
    const html = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${answers.user_name} Portfolio</title>
        </head>
        <body>
            <section id="aboutMe">
                <img src="${answers.img_link}">
                <h1>Hello my name is ${answers.user_name}</h1>
                <h2>I am from ${answers.location}</h2>
    
                <h3>A little about me:</h3>
                <p>${answers.bio}</p>
            </section>
            <section id="contactMe">
                <h4>Here are some different methods to contact me</h4>
                <ul>
                <li><a href="mailto: ${answers.email}">Email Me</a></li>
                <li><a href ="${answers.github}">GitHub</a></li>
                <li><a href="${answers.linkedin}">LinkedIn</a></li>
            </ul>
            </section>
            <section id="languages">
            ${answers.languages.length ? `<h4>Languages</h4>` : ``}
            <ul>
        ${languageList(answers.languages)}
        </ul>
        </section>
        </body>
    
        <script src="script.js"></script>
    </html>`;

    console.log(answers);
    fs.writeFile(`${answers.user_name}.html`, html, (err) =>
        err ? console.error(err) : console.log("HTML file created")
    );
});

function languageList(languages) {
    return languages.map((language) => `<li>${language}</li>`).join("");
}
