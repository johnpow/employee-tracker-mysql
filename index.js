const inquirer = require("inquirer");
const fs = require("fs");
const {Triangle, Circle, Square} = require('./lib/shapes.js');
const {generateGraphic} = require('./lib/generateGraphic.js');
//used documentation for max input https://www.npmjs.com/package/inquirer-maxlength-input-prompt
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)

// TODO: Create an array of questions for user input
const questions = [
  {
    type: 'maxlength-input',
    name: "lettersText",
    message: "What letters would you like in your graphic? (enter up to 3 characters)",
    response: "input",
    maxLength: 3
  },
  {
    name: "lettersColor",
    message: "What color should the letters be? (enter a color keyword OR a hexadecimal number)",
    response: "input",
  },
  {
    name: "graphicShape",
    message: "Which shape would you like?",
    type: "rawlist",
    choices: [
      'Circle','Triangle','Square'
    ],
  },
  {
    name: "graphicColor",
    message: "What color should the shape be? (enter a color keyword OR a hexadecimal number)",
    response: "input",
  },
];

//Create a function to write SVG file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.log("Error", err);
      return;
    }
    console.log("success");
  });
}

function init() {
  inquirer.prompt(questions).then((shapeData) => {

    

    if (shapeData.graphicShape === 'Triangle') {
      const shape = new Triangle(shapeData.lettersText,shapeData.lettersColor,shapeData.graphicColor);
      this.shape = shape;
    } else if (shapeData.graphicShape === 'Circle')  {
      const shape = new Circle(shapeData.lettersText,shapeData.lettersColor,shapeData.graphicColor);
      this.shape = shape;
    } else if (shapeData.graphicShape === 'Square')  {
      const shape = new Square(shapeData.lettersText,shapeData.lettersColor,shapeData.graphicColor);
      this.shape = shape;
    }

    this.shape.setColor(shapeData.graphicColor)
    writeToFile(`./examples/g_${this.shape.lettersText}.svg`, generateGraphic(this.shape));
    

  });
}

init();
