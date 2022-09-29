import fs from "fs";

export const chooseRandom = (array = [], numItems) => {
  // TODO implement chooseRandom
  if (array.length <= 1) {
    return array;
  }

  numItems < 1 || numItems > array.length
    ? (numItems = Math.floor(Math.random() * (1, array.length)))
    : numItems;

  const shuffledArr = [...array].sort(() => 0.5 - Math.random());
  return shuffledArr.slice(0, numItems);
};

const buildQuestionObj = (i) => ({
  // Questions are repeated numQuestion number of times
  type: "input",
  name: `question-${i + 1}`,
  message: `Enter question ${i + 1}`,
});

const buildChoiceObj = (i, j) => ({
  // Choices are repeated numChoices number of times for each question
  type: "input",
  name: `question-${i + 1}-choice-${j + 1}`,
  message: `Enter answer choice ${j + 1} for question ${i + 1}`,
});

export const createPrompt = ({ numQuestions = 1, numChoices = 2 } = {}) => {
  // TODO implement createPrompt
  let questions = [];

  for (let i = 0; i < Number.parseInt(numQuestions); i++) {
    questions.push(buildQuestionObj(i));
    for (let j = 0; j < Number.parseInt(numChoices); j++) {
      questions.push(buildChoiceObj(i, j));
    }
  }

  //Used for debugging
  // console.log(questions);
  return questions;
};

export const createQuestions = (object = {}) => {
  // TODO implement createQuestions
  let questions = [];
  let questionKeys = Object.keys(object).filter((name) =>
    name.match(new RegExp(/question-\d+$/))
  );

  // for (let i = 0; i < questionKeys.length; i++) {
  for (let key of questionKeys) {
    let choiceKeys = Object.keys(object).filter((name) =>
      name.match(new RegExp(`${key}-choice-\\d+$`))
    );

    let question = {
      // Repeated for the total number of questions
      type: "list",
      name: key,
      message: object[key],
      choices: [],
    };

    for (let choiceKey of choiceKeys) {
      question.choices.push(object[choiceKey]);
    }

    questions.push(question);
  }

  //Used for debugging
  //console.log(questions);
  return questions;
};

export const readFile = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)));
  });

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) =>
      err ? reject(err) : resolve("File saved successfully")
    );
  });
