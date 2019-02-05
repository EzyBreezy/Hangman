// 4 input fields on page
const submit = document.getElementById("submit");
const word = document.getElementById("word")
const start = document.getElementById("start");
const reset = document.getElementById("reset");

// timer updates
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

// timer variables for html document
const timer = document.getElementById("timer") 
let min = 0     // start game with 0 min
let sec = 00    // start game with 0 sec
let extra = 2   // add value for correct answers and number of words * future make this a field player can add bonus time value *

//adds word to word list
let wordList = []         // the list of words entered
let gameWord = []         // the playing word
let hashOfGameWord = []   // array of gameWord split

//Keyboard array
let keyboardStrokes = [] // stores key pressed to filter

submit.addEventListener("click", function buttonClicked() {                             // submit button event listener
    if (word.selectionEnd > 0) {                                                        // looked at the object to see if it has a word greater then 0
        wordList.push(word.value.toUpperCase())                                         // pushes the word too wordList array
        console.log("The word pushed on submit is ", wordList)                          // testing purpose
        addTime(extra)                                                                  // add extra time for each word entered overall
        minutes.innerHTML = min                                                         // Shows bonus time for words
        word.value = ""                                                                 // clears the value on submit
    }
    else {
        alert("I need a word")                                                          // alert for when no word is entered
    }
})

start.addEventListener("click", function buttonClicked() {                              // start button event listener
    if (gameWord.hasOwnProperty([0]) === false) {                                       // checks to make sure current game isnt active
        if (wordList.hasOwnProperty([0]) === true) {                                    // can only start the game if the wordList has words to play with.
            selectWord(wordList)                                                        // picks one word from wordList
            splitOfWords()
            countDown();                                                                // Clock starts ticking
            document.addEventListener("keypress", function keyboard(event) {
                if (keyboardStrokes.indexOf(event.key.toUpperCase()) === -1) {          // only checks if the keypressed wasnt already entered
                    keyboardStrokes.push(event.key.toUpperCase())                       // pushes the value of key pressed to array keyboardStrokes
                    console.log("The values in keyboardStrokes:", keyboardStrokes)      // ***testing***
                    gameLogic(event)
                }
            })
        }
        else if (wordList.hasOwnProperty([0]) === false) {                              // if false
            window.alert("I need some words!")                                          // lets player know needs more words
        }
    }
})


reset.addEventListener("click", function buttonClicked() {      // reset button event listener
    window.alert("reset works")                                 // needs work
})

function gameLogic(event) {
    for (let i=0; i < hashOfGameWord[0].length; i++) {
        if(hashOfGameWord[0][i] === event.key.toUpperCase()){
            console.log("You got it right I found ", event)
        } else if (hashOfGameWord[0][i] !== event.key.toUpperCase()) {
            console.log("You got it wrong I didnt find ", event)
        }  
    } 
}

// function that splits the game word
//      [x] splits the game word
function splitOfWords(){
    hashOfGameWord.push(gameWord[0].split(""))                                      // brakes the game word into individual arrays of each letter
}


// function to pick a word
//      [x] picks a word randomly
//      [x] removes the word from the list of words 
//          if being played
function selectWord(wordList) {                                          // picks a word out
    gameWord.push(wordList[Math.floor(Math.random() * wordList.length)]) // picks a random word if more than 1
    wordList.splice(wordList.indexOf(gameWord[0]), 1)                    // splice method to remove using indexOf and setting number of words to be removed too 1
}

// function to add time
//      [x] adds 2 minutes
function addTime(extra) {                                       // executable function to add time for each word entered
    min += extra                                                // adds the time and stores that time in minutes
}

// function that counts down
//      [x] takes the value of minutes 
//      and counts down from that value
//      [x] up scalable
function countDown() {                                          // countdown function
    let ts = setInterval(function () {
        if (min > 0) {
            // we have a min
            if (sec > 0) {
                // subtract a sec
                sec--
                seconds.innerHTML = sec
            }
            else if (sec === 0) {
                // if the sec are finished subtract a min
                min--
                sec += 60
                minutes.innerHTML = min
                seconds.innerHTML = sec
            }
        }
        else if (sec > 0) {
            // if we dont have a minute but we have a sec
            sec--
            seconds.innerHTML = sec
        }
        // time runs out
        else if (min === 0 && sec === 0) {
            alert("Game Over")
            clearInterval(ts)
        }
    }, 1000)
}


// sudo code

/*

    friend or player enters number of words.
    event listener for submit box. *DONE*
    onClick let user know button was hit some way.  **Need to work on this**
    words are converted to all caps. *DONE*
    words are pushed to wordLIST *DONE*
    add event listener for start. *DONE*
    hide submit and word.
    timer starts counting down.
    randomly select one of the words from the word bank.
    create a number of _ _ _ _ for each letter of the word.
    add event listener to keystrokes.
    filter right letters pressed vs wrong letters pressed

    check for duplicate word entries
    check for empty string entries
*/


/*  
    array.some(function(){ }) allows you to write a function to test each letter
    forEach() method executes a provided function once for each array element.
    substring() & substr() // removes letters from a word
    trim() // removes whitespace
    change color of start to red once word is entered.
*/

/*
//acomplishments
- Got Timer to function, YAY!
- Removing word from wordList is working like a charm, YAY!
- keyStrokes are working!
*/