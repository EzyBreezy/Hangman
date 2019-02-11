// time stamp
let play = true

// 4 input fields on page
const submit = document.getElementById("submit");
const word = document.getElementById("word")
const start = document.getElementById("start");
const reset = document.getElementById("reset");

//hangman image
let position = 0


// timer updates
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

// answer
const answer = document.getElementById("correct");
const total = document.getElementById("total")

// timer variables for html document
const timer = document.getElementById("timer")
let min = 0     // start game with 0 min
let sec = 00    // start game with 0 sec
let extra = 1  // add value for correct answers and number of words * future make this a field player can add bonus time value *

//adds word to word list
let wordList = []         // the list of words entered
let gameWord = []         // the playing word
let hashOfGameWord = []   // array of gameWord split
let displayWord = []      // the displayed array of letters

// print of guess spaces
let render = document.getElementById("guess");

//Keyboard array
let letterGuessed = [] // stores key pressed to filter to prevent redundancy 
let letterCount = 0 //keeps count of letters that passed test

// Game Logic
let win = 0     // needs work
let lose = 0    // needs work

submit.addEventListener("click", function buttonClicked() {                             // submit button event listener
    if (word.selectionEnd > 0) {                                                        // looked at the object to see if it has a word greater then 0
        wordList.push(word.value.toUpperCase())                                         // pushes the word too wordList array
        console.log("The word pushed on submit is ", wordList)                          // testing purpose
        addTime(extra)                                                                  // add extra time for each word entered overall
        total.innerHTML = wordList.length
        minutes.innerHTML = min                                                         // Shows bonus time for words
        word.value = ""                                                                 // clears the value on submit
    }
    else {
        alert("I need a word")                                                          // alert for when no word is entered
    }
})

start.addEventListener("click", function buttonClicked() {                              // start button event listener
    play = true
    if (gameWord.hasOwnProperty([0]) === false) {                                       // checks to make sure current game isnt active
        if (wordList.hasOwnProperty([0]) === true) {                                    // can only start the game if the wordList has words to play with.
            selectWord(wordList)                                                        // picks one word from wordList
            guessSpace()                                                                // creates " _ " to be rendered
            renderWord()                                                                // renders word
            console.log("the game word length is = ", gameWord[0].length)               // ** test that shows length of word **
            splitOfWords();                                                             // splits the chosen gameword into an array of individual letters
            countDown();                                                                // Clock starts ticking
            listener()                                                                  // listens for keyboard input
            document.getElementById("game-image").style.background = `url(images/PixelArt.png) ${position}px 0px`
        }
        else if (wordList.hasOwnProperty([0]) === false) {                              // if false
            window.alert("I need some words!")                                          // lets player know needs more words
        }
    }
})


reset.addEventListener("click", function buttonClicked() {      // reset button event listener
    sec = 00
    min = 00
    seconds.innerHTML = sec
    minutes.innerHTML = min
    document.removeEventListener("keypress", (event) => {
        console.log(event)
    })
})

function gameLogic(event) {                                                                                                 // Game Logic Function
    if (hashOfGameWord[0].length > letterCount) {                                                                           // if the length of the split word is greater then total letter count
        if (checkEach(hashOfGameWord[0], event.key.toUpperCase()) === true) {                                               // returns boolean and expects true when checking each key vs each letter
            console.log("You got it right I found ", event.key.toUpperCase());                                              // *TESTING* Notifies that it found that key.
            // add a color indicator for correct key
            // add way to keep track of now un available letters
            for (i = 0; i < hashOfGameWord[0].length; i++) {                                                                // for loop that runs for length of word.
                if (hashOfGameWord[0][hashOfGameWord[0].indexOf(event.key.toUpperCase())] === event.key.toUpperCase()) {    // checks hash of game words letters match up.
                    displayWord[0].splice(hashOfGameWord[0].indexOf(event.key.toUpperCase()), 1, event.key.toUpperCase())
                    renderWord()
                    hashOfGameWord[0].splice(hashOfGameWord[0].indexOf(event.key.toUpperCase()), 1, "_")                    // removes the letter at the index
                    addOne()                                                                                                // add one to counter
                    if (hashOfGameWord[0].length === letterCount && wordList.hasOwnProperty([0]) === true) {                // if more games are available to pick continue
                        pickOne()
                    } else if (wordList.hasOwnProperty([0]) === false && hashOfGameWord[0].length === letterCount) {        // if no more words to pick game is over
                        youWin()
                    }
                }

            }
        } else if (checkEach(hashOfGameWord[0], event.key.toUpperCase()) === false) {                                   // checks for a false boolean for k
            console.log("You got it wrong I didnt find ", event.key.toUpperCase())
            // add a way to notify wrong letters
            // add a way to keep track of key now un available letters
            
            hangmanPos()
            document.getElementById("game-image").style.background = `url(images/PixelArt.png) ${position}px 0px`
        }
    }
}


// function that handles the keyboard listening
function listener() {
    document.addEventListener("keypress", (event) => {            // event listener
        if (letterGuessed.indexOf(event.key.toUpperCase()) === -1) {          // only checks if the keypressed wasnt already entered
            letterGuessed.push(event.key.toUpperCase())                       // pushes the value of key pressed to array letterGuessed
            console.log("The values in letterGuessed:", letterGuessed)      // ***testing***
            gameLogic(event)
        }
    })
}

function hangmanPos() {
    position -= 200
}


// adds 1 to letterCount to keep status of game
//      [x] adds 1 to the variable letterCount
function addOne() {
    letterCount += 1
}

// function to check each key for wrong or right.
//      [x] returns a boolean value true or false if the key exists.
function checkEach(lettersArr, key) {
    return lettersArr.some(function (lettersArrKeyStrokes) {
        return key === lettersArrKeyStrokes
    })
}


// function that splits the game word
//      [x] splits the game word
function splitOfWords() {
    hashOfGameWord.push(gameWord[0].split(""))                          // brakes the game word into individual arrays of each letter
}

// function that renders "_" for each letter
//      [x] renders the empty space platform as " _ "
function guessSpace() {
    displayWord.push("_".repeat(gameWord[0].length).split(""))  // creates "_" space for game word render
}

// function that joins the word rendered and displays the value.
//      [x] reusable function that renders the played word.
function renderWord() {
    render.innerHTML = displayWord[0].join(" ")
}

// function to pick a word
//      [x] picks a word randomly
//      [x] removes the word from the list of words 
//          if being played
function selectWord(wordList) {                                          // picks a word out
    gameWord.push(wordList[Math.floor(Math.random() * wordList.length)]) // picks a random word
    wordList.splice(wordList.indexOf(gameWord[0]), 1)                    // splice method to remove using indexOf and setting number of words to be removed too 1
    test()
}

// function to add time
//      [x] adds 2 minutes
function addTime(extra) {                                       // executable function to add time for each word entered
    min += extra                                                // adds the time and stores that time in minutes
}


function timeStop(ts) {
    clearInterval(ts)   // stops time counter
}


function pickOne() {
    addTime(extra)                                                              // adds time for every correct word completed
    gameWord = []                                                               // reset gameWord to empty array to be filled with new word
    hashOfGameWord = []                                                         // reset hashOfGameWord to empty array
    letterGuessed = []                                                          // reset guessed letters array
    letterCount = 0                                                             // letter count tracker reset to 0
    displayWord = []
    selectWord(wordList)                                                        // picks one word from wordList and asigns it to gameWord
    splitOfWords();                                                             // splits the chosen word and pushes to hashofgamewor
    guessSpace()
    renderWord()                                                                  // test full of console.log for status
}

function youWin() {
    alert("You won!")
    play = false
    minutes.innerHTML = min
    seconds.innerHTML = sec
    gameWord = []
    letterGuessed = []
    letterCount = 0
    console.log("You won! Congratulations <(^_^)>")
}

function test() {
    console.log("/// Test Function ///")
    console.log("the list of words in game are: ")
    console.log("wordList is => ", wordList)
    console.log("                              ")
    console.log("the selected gameWord is: ")
    console.log("gameWord is => ", gameWord)
    console.log("                              ")
    console.log("the hash of game word is : ")
    console.log("hashOfGameWord is => ", hashOfGameWord)
    console.log("                              ")
    console.log("the rolling cycle of letters are: ")
    console.log("Letter Count is => ", letterCount)
    console.log("                              ")
    console.log("the input collection is: ")
    console.log("letterGuessed is => ", letterGuessed)
    console.log("                              ")
    console.log("the visable word to players is: ")
    console.log("displayWord is => ", displayWord)
    console.log("                              ")
}

// function that counts down
//      [x] takes the value of minutes 
//      and counts down from that value
//      [x] up scalable meaning can add extra time
//      [x] switch to indicate if game has ended, or still in play

function countDown() {                                      // countdown function
    let ts = setInterval(function () {
        if (play === true) {
            if (min > 0) {                                          // if minutes are greater then 0
                // we have a min
                if (sec > 0) {                                      // if sec are greater then 0  remove 1 sec
                    // subtract a sec
                    sec--                                           // remove 1 sec
                    seconds.innerHTML = sec                         // print sec
                    minutes.innerHTML = min                         // print min
                }
                else if (sec === 0) {                               // if sec hits 0 add sec
                    // if the sec are finished subtract a min
                    min--                                           // remove 1 min
                    sec += 60                                       // reset sec to 60
                    minutes.innerHTML = min                         // print minutes
                    seconds.innerHTML = sec                         // print sec
                }
            }
            else if (sec > 0) {
                // if we dont have a minute but we have a sec
                sec--                                               // takes 1 sec
                seconds.innerHTML = sec                             // print sec
                minutes.innerHTML = min                             // print min
            }
            // time runs out
            else if (min === 0 && sec === 0) {                      // if time runs out
                minutes.innerHTML = min
                seconds.innerHTML = sec
                clearInterval(ts)
                window.alert("Time ran out! T_T")
            }
        } else if (play === false) {
            min = 0
            sec = 00
            minutes.innerHTML = min
            seconds.innerHTML = sec
            clearInterval(ts)
        }
    }, 1000)
}




// sudo code

/*
    // to do's
    onClick let user know button was hit some way.  **Need to work on this**
    hide submit and word. ** Need to work on this **
    check for duplicate word entries *Need to work on this.*
    check for empty string entries *Need to work on this.*
    keep track of players right and wrong answers. *Need to work on this* 
    timer starts counting down. *DONE need to work on this*
    hangman sprite in images folder. each sprite 200 apart.
*/


/*
    // cool javascript
    substring() & substr() // removes letters from a word
    trim() // removes whitespace
    change color of start to red once word is entered.
    add a method of updating time value each time is reset to prevent ocasional nun value
*/


/*
// ideas
[ ] total words - Instead of counting total number of words input. Count completed words instead. Example would be if I have 10 words got 5 word entries but only 2 right I would see 2 / 5
[ ] streak of words - If I got a streak show a number value for how many I got correct.
[ ] Completed Words list - A library of words I completed.
[ ] 1 Player Mode - Single player mode would have a json list of words
[ ] 2 Player Mode - current game but an option to select it.
*/