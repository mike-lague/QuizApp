$(document).ready(function() {
  
  initData();
  initDisplay();

});

var questionData = [ 
  ["How many operas did Gilbert and Sullivan collaborate on?", 
  ["14", "13", "10", "12"], 0],
  ["Which opera contains the character of Dick Deadeye ?",
  ["The Pirates of Penzance", "H.M.S. Pinafore", "The Sorcerer", "Peter Pan"], 1],
  ["What is the nationality of Strephon, the shepherd?",
  ["Elysian", "Greek", "Arcadian", "Baratarian"], 2],
  ["What is the territory over which the Grand Duke rules?",
  ["Neu Schwanstein", "Pfennig Halbpfennig", "Bavaria", "Barataria"], 1],
  ["What is the order in which the three most famous operas were written?",
  ["Pirates, Pinafore, Mikado", "Pinafore, Pirates, Mikado",
   "Pirates, Mikado, Pinafore", "Mikado, Pinafore, Pirates"], 1]
];

questionIndex = 0;
questionAnswer = "";
correctAnswers = 0;

// array of Question objects, built from questionData by initData
questionObjects = []; 
// array of correct answer ids, of the form "qQaA", e.g., q0a3
correctAnswerIds = [];


function initData() {
  for (i in questionData) {
    var qdata = questionData[i];
    questionObjects.push(new Question("q" + i, qdata[0], qdata[1], qdata[2]));
  }
}

function initDisplay() {
  var button = new Button("submitAnswer", "Submit Answer", nextQuestion);
  document.getElementById("solution").appendChild(button.EL);
  questionObjects[0].display(1);
}

function nextQuestion() {
  var result = "";
  if (correctAnswer(questionAnswer)) {
    correctAnswers++;
    result = "Correct!";
  } else {
    result = "WRONG!";
  }
  console.log(questionAnswer + ": " + result);

  questionAnswer = "";
  questionIndex++;
  if (questionIndex < questionObjects.length) {
    questionObjects[questionIndex].display(questionIndex + 1);
  } else {
    displayResults();
  }
}

function displayResults() {
  result = correctAnswers + " correct answers (out of " + 
           questionObjects.length + "): "  +
           correctAnswers/questionObjects.length*100 + "%" ;
  console.log(result);
  $("#question").html("Test complete!");
  $("#solution").html("<h2>" + result + "</h2>");
  $("#answers").html("");
}

function correctAnswer(answer) {
  return (correctAnswerIds.indexOf(answer) >= 0) ;
}

function answerClick(event) {
  
  console.log(event.target.id);
  
  $(".bclass").css("backgroundColor", "lightgray");
  document.getElementById(event.target.id).style.backgroundColor = "lightgreen";

  questionAnswer = event.target.id;
}

function Question(id, text, answerText, correctAnswerIndex) {
  this.id = id;
  this.text = text;
  this.answers = [];
  for (i in answerText) {
    var bid = id + "a" + i;
    this.answers.push(new Button(bid, answerText[i], answerClick));
    if (i == correctAnswerIndex) {
      correctAnswerIds.push(bid);
    }
  }
  this.correct = correctAnswerIndex;

  this.display = function(number) {
    // display the question, prefixed by a number
    $("#question").html(number + ". " + this.text);
    // clear the previous answers
    $("#answers").html("");
    // build up the answer list
    answerlist = document.getElementById("answers");
    for (i in this.answers) {
      listitem = document.createElement('li');
      listitem.appendChild(this.answers[i].EL);
      answerlist.appendChild(listitem);
    }
  }
}


function Button(id, text, onclick) {

  // This creates and element that is attached
  // to the button instance
  this.EL = document.createElement('input');

  // These are our default button properties
  this.EL.className = "bclass"; 
  this.EL.id = id;
  this.EL.type = "button";
  this.EL.value = text;

  this.EL.onclick = onclick;

  console.log(this.EL);
}

