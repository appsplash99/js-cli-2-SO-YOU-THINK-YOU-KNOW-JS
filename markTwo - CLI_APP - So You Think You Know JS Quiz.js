/*
This Quiz is based on a famous book called You Don't Know JS
Here's more on the subject - https://github.com/austintackaberry/ydkjs-exercises

bonus homework:
1 explore readlineSync YES/NO questions
    applied: on line 193
2 use chalk
    applied: in whole script
3 has the user beaten high score?
    applied: in if block from line 139

4 PLAYABLE LINK = https://repl.it/@ApurvChimralwar/markTwo-CLI-APP-So-You-Think-You-Know-JS-Quiz?​embed=1&output=1
*/ 


var readlineSync = require('readline-sync');    // Dependency on readline-sync package
const chalk = require('chalk');                 // Dependency on Chalk Package

// initializing score variable
var userScore = 0;

// Storing HighScores
var highScores = [
  {
    name: "Freaky Frank",
    score: 2,             // max high score 
  },
  {
    name: "Dizzy David",
    score: 1,
  }
]

// custom output function to reduce code clutter
const log = console.log;

// 1 chalkCode function - Convert string to desired chalk format
function chalkCode(s) {
  return chalk.white.bold.bgGrey(s);
}

// 2 chalkQue function - Convert string desired chalk format
function chalkQue(s) {
  return chalk.blue.bold(s);
}

// 3 chalkAns function
function chalkAns(s) {
  return chalk.green.bold.dim(s);
}

// 4 chalkQnum
function chalkQnum(s) {
  return chalk.white.bold(s);
}

// 5 chalkName
function chalkName(s) {
  return chalk.bold.magentaBright(s);
}

// 6 chalkJS format
function chalkJS(s) {
  return chalk.bold.black.bgYellowBright(s);
}

// 7 Greet User Function  - Take input from user and output it.
/* returns CurrentUserName */
function greetUser() {

  log( chalk.bold.cyan(`\n\nHello there!, And Welcome to the`) +
      ` ${chalkJS(' QUIZ ')}\n`);
  log(chalk.bold.cyan.inverse(" ------------------------------------- "));
  log(chalk.bold.cyan.inverse(` |    SO YOU THINK YOU KNOW `) + 
      `${chalkJS(' JS ')}` + 
      chalk.bold.cyan.inverse(` ?   | `));
  log(chalk.bold.cyan.inverse(" ------------------------------------- \n\n"));

  // readline-sync options function
  log(chalk.bold.green("Please choose a 'Prefix' for your Name, before starting the Quiz:"))
  prefixes = ['Mr', 'Miss', "Smart", 'shaquille_oatmeal', "Ma'am", 'Sir', 'Brainless', "Sweet", "DragonX", "Yogi", "Gamer", "Angel", "Coder", "Zombie"]
  log(chalk.red.bold.inverse("  NOTE: DO NOT PRESS ENTER KEY, AFTER TYPING INPUT;  "))
  log(chalk.red.bold.inverse("        ELSE, YOUR NAME WON'T BE SAVED               "))
  index = readlineSync.keyInSelect(prefixes, chalk.green.bold('Enter a value from the Given Range:\n'));

  var userPrefix = prefixes[index];

  // when user cancels prefix selection
  if (!prefixes.includes(userPrefix)) {
    userPrefix = 'user'
  }

  var userName = readlineSync.question(chalk.bold.green("\nWhat should we Call you?\n") + chalkName(`${userPrefix} `));

  let currentUserName = userPrefix + " " + userName;
  
  log(chalk.yellowBright.bold("\nWelcome "),  chalkName(currentUserName));

  return currentUserName;      // for using in other functions
}

// 8 play function to ask Q&A
/* args: que, ans  --> string */
function askQandA(que, ans) {
    var userAnswer = readlineSync.question(chalkQue(que) +`${chalkAns("\nANSWER: ")}`);
    // conditional branching
    if (userAnswer === ans | userAnswer === ans.toLowerCase() | userAnswer === ans.toUpperCase()) {
        log(chalk.green.bold('Correct Answer'));
        userScore++;
    } else {
        log(chalk.red.bold(`Wrong Answer, Correct Answer is "${ans}"`))
    }
    log(chalk.yellow('------------------------\n'), 
        chalk.yellowBright.bold('   Current Score:', userScore),
        '    \n' + chalk.yellow('------------------------\n\n')
        )
}

// 9 showScore function to display and compare HighScore
/* arguments: name --> string*/ 
function showScores(name) {

  // set a maxScore as the greatest score value
  var maxScore = 0;
  for (let i in highScores) {
    let person = highScores[i];
    if (userScore>person.score) {
      maxScore = userScore;
    } else {
      maxScore = person.score;
    }
    
    // at last iteration
    if (i == (highScores.length - 1)) {
      
      if (maxScore === userScore && maxScore !== person.score) {

        // user breakes highscore
        log(chalk.whiteBright.bold("\n YAY! ") + `${chalkName(name)} ` + 
            chalk.bold.white(" YOU HAVE MADE A ") + 
            chalkJS(" HIGH SCORE ") + 
            chalk.bold.white(' OF ') + 
            chalkJS(` ${userScore} \n`)
        );
        log(chalk.yellow.bold(`-----------------------------------------------------------------------------`));
        log(chalk.black.bold.bgYellow(` Please send screenshot so that we can update the high score data structure. `));
        log(chalk.yellow.bold(`-----------------------------------------------------------------------------`));


        } else {

        // user fails to make highscore
        log(chalk.whiteBright.bold(" YAY!"),
            `${chalkName(name)}`,
            chalk.whiteBright.bold("You have Scored:"),
            `${chalk.green.bold(userScore)}`, '\n'
            );
        // final display score board
        log(chalkJS(" Check out the FINAL SCORE BOARD: "));
        for (let i in highScores) {
            log(highScores[i].name, " : ", highScores[i].score);
        }
      }
    }
  }
}  


// 10 function to loop over questions
function playLoop() {
  for (let i in quizQues) {

    // Display Score Board at first Iteration
    if (i==0) {
    log(chalk.whiteBright.bold("\nHere's the Current SCORE BOARD: "));
      for (let i in highScores) {
          log(highScores[i].name, " : ", highScores[i].score);
      }
    log(chalkJS("\n\n  LET'S BEGIN THE QUIZ  \n"));
    }

    var currentQuestion = quizQues[i]
    askQandA(currentQuestion.que, currentQuestion.ans)
  }
}

// 11 function replay() to play continuously
function replay() {
  let wannaReplay = readlineSync.keyInYN(chalk.bold.green.inverse('\n\n Do you want to play Again?    \n NOTE: Only Enter small case values: '));
  if (wannaReplay | String(wannaReplay).toLowerCase()) {
    playLoop();
    showScores(a);
    replay();
  } else {
    log(chalk.bold.yellow.inverse('\n Thank You for Playing! '));
    log(chalk.bold.white.bgMagenta("\n Have a Gr8 Day :)) "))
  }
}


//Question Objects
var que1 = {
  que: `${chalkQnum("Q1.")} Which of the following are ALL built-in types of values?
  a. string, operator, boolean
  b. object, number, null
  c. boolean, scope, number
  d. undefined, string literal, object\n`,
  ans: "b"
};
var que2 = {
  que: `${chalkQnum("Q2.")} What is the operator that can be used to find out the type of a value?

  a. ${chalkCode(" var ")}          b. ${chalkCode(" obj ")}\n
  c. ${chalkCode(" typeOf ")}       d. ${chalkCode(" return ")}\n`,
  ans: "c"
};
var que3 = {
  que: `${chalkQnum("Q3.")} What is the return value of: ${chalkCode(" typeof null ")}?
  a. boolean
  b. object
  c. undefined
  d. number\n`,
  ans: "b"
};
var que4 = {
  que: `${chalkQnum("Q4.")} What is the return value of:\n${chalkCode(" typeof [1,2,3] === typeof {val: 'a', val: 'b', val: 'c'}; ")}?
  a. true
  b. false
  c. undefined
  d. Syntax error\n`,
  ans: "a"
};
var que5 = {
  que: `${chalkQnum("Q5.")} In which ways can properties be accessed in an object?
  a. with dot notation OR bracket notation
  b. by the values corresponding to the properties
  c. with the object's prototype
  d. the same as in an array\n`,
  ans: "a"
};
var que6 = {
  que: `${chalkQnum("Q6.")} What is the main difference between an array and an object?
  a. the maximum length of values they can hold
  b. positions in arrays begin from 0 and in objects from 1
  c. arrays hold values with indexed positions instead of key/value pairs
  d. anything can be stored in objects but only strings and numbers in an array\n`,
  ans: "c"
};
var que7 = {
  que: `${chalkQnum("Q7.")} Which of the following is an array property?
  a. values
  b. count
  c. limit
  d. length\n`,
  ans: "d"
};
var que8 = {
  que: `${chalkQnum("Q8.")} What is the most appropriate use of an object?
  a. to have numeric properties (keys)
  b. to only store strings
  c. to hold pairs of named properties and values
  d. to find out the count of properties\n`,
  ans: "c"
};
var que9 = {
  que: `${chalkQnum("Q9.")} What are the types of coercion (conversion from one type to another)?
  
  a. natural and unnatural
  b. implicit and explicit
  c. normal and abnormal
  d. equal and unequal\n`,
  ans: "b"
};
var que10 = {
  que: `${chalkQnum("Q10.")} Which of these next statments is an implicit coercion (conversion from one type to another)?

  a. ${chalkCode(" var b = Number( '5' ); ")}          b. ${chalkCode(" var b = '5' * 1; ")}\n
  c. ${chalkCode(" var b = 'Hello, world' * 1; ")}     d. ${chalkCode(" var b = String( 5 ); ")}\n`,
  ans: "b"
};

// Array of Quiz Question objects
var quizQues = [que1, que2, que3, que4, 
                que5, que6, que7, que8, 
                que9, que10 ]


// FUNCTION CALLS

var a = greetUser();  // currentUserName

playLoop()

showScores(a);        // uses currentUserName at output

replay();
