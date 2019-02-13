// game status
let play = true

// 4 input fields on page
const submit = document.getElementById("submit");
const word = document.getElementById("word")
const start = document.getElementById("start");
const reset = document.getElementById("reset");

//hangman image
let position = 0 // changes by 200 to show sprite

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

// position of print of guess spaces
let render = document.getElementById("guess");

//Keyboard array
let letterGuessed = [] // stores key pressed to filter to prevent redundancy 
let letterCount = 0 //keeps count of letters that passed test
// adds 1 to letterCount to keep status of game
//      [x] adds 1 to the variable letterCount
let addOne = () => {
    letterCount += 1
}

// Game Logic
let failed = 0    // needs work so when the 7 tries failed gameOver
let fail = () => {failed += 1}

submit.addEventListener("click", () => {                             // submit button event listener
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

start.addEventListener("click", () => {                              // start button event listener
    play = true
    if (gameWord.hasOwnProperty([0]) === false) {                      // checks to make sure current game isnt active
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


reset.addEventListener("click", () => {      // reset button event listener
    // game stops
    play = false

    // resets the position of hangman
    position = 0
    document.getElementById("game-image").style.background = `none`

    // resets time
    sec = 00
    min = 00
    seconds.innerHTML = sec
    minutes.innerHTML = min

    // reset the words
    wordList = [] // array of words entered
    gameWord = [] // the word being played from wordList
    hashOfGameWord = [] // the split array of gameWord
    displayWord = [] // the progress of the word entered
    letterGuessed = [] // array of all letters guessed
    letterCount = 0 // the number of guessed letteres set back to 0

    // render empty string for the guessed letters area.
    render.innerHTML = ""  // display empty string to clear guessed letter
})

let gameLogic = (event) => {                                                                                                 // Game Logic Function
    if (hashOfGameWord[0].length > letterCount && play === true) {                                                                           // if the length of the split word is greater then total letter count
        if (checkEach(hashOfGameWord[0], event.key.toUpperCase()) === true) {                                               // returns boolean and expects true when checking each key vs each letter
            console.log("You got it right I found ", event.key.toUpperCase());                                              // *TESTING* Notifies that it found that key.
            // add a color indicator for correct key
            // add way to keep track of now un available letters
            for (i = 0; i < hashOfGameWord[0].length; i++) {                                                                // for loop that runs for length of word.
                if (hashOfGameWord[0][hashOfGameWord[0].indexOf(event.key.toUpperCase())] === event.key.toUpperCase()) {    // checks hash of game words letters match up.
                    displayWord[0].splice(hashOfGameWord[0].indexOf(event.key.toUpperCase()), 1, event.key.toUpperCase())   // the variable displayWord gets the key input that matches spliced with the actual letter value
                    renderWord()                                                                                            // updates the word state
                    hashOfGameWord[0].splice(hashOfGameWord[0].indexOf(event.key.toUpperCase()), 1, "_")                    // removes the letter at the index
                    addOne()                                                                                                // add one to counter
                    if (hashOfGameWord[0].length === letterCount && wordList.hasOwnProperty([0]) === true) {                // if more games are available to pick continue
                        pickNextOne()
                    } else if (wordList.hasOwnProperty([0]) === false && hashOfGameWord[0].length === letterCount) {        // if no more words to pick game is over
                        youWin()
                    }
                }

            }
        } else if (checkEach(hashOfGameWord[0], event.key.toUpperCase()) === false) {                                   // checks for a false boolean for k
            console.log("You got it wrong I didnt find ", event.key.toUpperCase())
            // add a way to notify wrong letters
            // add a way to keep track of key now un available letters
            fail()
            hangmanPos()
            document.getElementById("game-image").style.background = `url(images/PixelArt.png) ${position}px 0px`
            if (failed === 6) {
                youLose()
                // you lose
            }
        }
    }
}


// function that handles the keyboard listening
let listener = () => {
    document.addEventListener("keypress", (event) => {            // event listener
        if (letterGuessed.indexOf(event.key.toUpperCase()) === -1 && play === true) {          // only checks if the keypressed wasnt already entered
            letterGuessed.push(event.key.toUpperCase())                       // pushes the value of key pressed to array letterGuessed
            console.log("The values in letterGuessed:", letterGuessed)      // ***testing***
            gameLogic(event)
        }
    })
}






// function to check each key for wrong or right.
//      [x] returns a boolean value true or false if the key exists.
let checkEach = (lettersArr, key) => {
    return lettersArr.some(function (lettersArrKeyStrokes) {
        return key === lettersArrKeyStrokes
    })
}


// function that splits the game word
//      [x] splits the game word
let splitOfWords = () => {
    hashOfGameWord.push(gameWord[0].split(""))                          // brakes the game word into individual arrays of each letter
}

// function that renders "_" for each letter
//      [x] renders the empty space platform as " _ "
let guessSpace = () => {
    displayWord.push("_".repeat(gameWord[0].length).split(""))  // creates "_" space for game word render
}

// function that joins the word rendered and displays the value.
//      [x] reusable function that renders the played word.
let renderWord = () => {
    render.innerHTML = displayWord[0].join(" ")
}

// function to pick a word
//      [x] picks a word randomly
//      [x] removes the word from the list of words 
//          if being played
let selectWord = (wordList) => {                                          // picks a word out
    gameWord.push(wordList[Math.floor(Math.random() * wordList.length)]) // picks a random word
    wordList.splice(wordList.indexOf(gameWord[0]), 1)                    // splice method to remove using indexOf and setting number of words to be removed too 1
    test()
}


let pickNextOne = () => {
    addTime(extra)                                                              // adds time for every correct word completed
    gameWord = []                                                               // reset gameWord to empty array to be filled with new word
    hashOfGameWord = []                                                         // reset hashOfGameWord to empty array
    letterGuessed = []                                                          // reset guessed letters array
    letterCount = 0                                                             // letter count tracker reset to 0
    failed = 0
    position = 0
    displayWord = []
    selectWord(wordList)                                                        // picks one word from wordList and asigns it to gameWord
    splitOfWords();                                                             // splits the chosen word and pushes to hashofgamewor
    guessSpace()                                                                // sets the spaces for guess box in html
    renderWord()                                                                // renders the spaces and positioning of words pickNextOne sets to empty "_ _ _" subjective to length of gameWord

}

let youWin = () => {
    renderWord()
    window.alert("You won!")
    play = false
    minutes.innerHTML = min
    seconds.innerHTML = sec
    gameWord = []
    letterGuessed = []
    letterCount = 0
    console.log("You won! Congratulations <(^_^)>")
}
let youLose = () => { // if you lose the word handler
    if (wordList.hasOwnProperty([0]) === true) {             // if you lose and wordList has more to be played
        alert("You almost had it")
        // add a way to store failed words
        gameWord = []                                           // resets the gameWord
        hashOfGameWord = []                                     // resets the splice of gameWord
        letterCount = 0                                         // clear the letter count back to 0
        letterGuessed = []                                      // clear the array of guessed letters
        displayWord = []                                        // reset the word render
        failed = 0                                              // the failed amount resets
        position = 0
        document.getElementById("game-image").style.background = `url(images/PixelArt.png) ${position}px 0px` // update image
        selectWord(wordList)
        splitOfWords()
        guessSpace()
    } else if (wordList.hasOwnProperty([0]) === false) { // if you lose
        alert("The End")
        play = false                                            // turn off game
        wordList = []                                           // reset the array of WordList
        gameWord = []                                           // resets the gameWord
        hashOfGameWord = []                                     // resets the splice of gameWord
        letterCount = 0                                         // clear the letter count back to 0
        letterGuessed = []                                      // clear the array of guessed letters
        displayWord = []                                        // reset the word render
        // print final stats future add
    } 
}

let test = () => {
    console.log("/// Test Function ///")
    console.log("the list of words in game are: ")
    console.error("wordList is => ", wordList)
    console.log("                              ")
    console.log("the selected gameWord is: ")
    console.error("gameWord is => ", gameWord)
    console.log("                              ")
    console.log("the hash of game word is : ")
    console.error("hashOfGameWord is => ", hashOfGameWord)
    console.log("                              ")
    console.log("the rolling cycle of letters are: ")
    console.error("Letter Count is => ", letterCount)
    console.log("                              ")
    console.log("the input collection is: ")
    console.error("letterGuessed is => ", letterGuessed)
    console.log("                              ")
    console.log("the visable word to players is: ")
    console.error("displayWord is => ", displayWord)
    console.log("                              ")
    // console.error("wordList has property array says", wordList[0].hasOwnProperty([0]))
    // console.error("wordList has own property no array says", wordList[0].hasOwnProperty() === false)
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

let timeStop = (ts) => {
    clearInterval(ts)   // stops time counter
}
// function to add time
//      [x] adds 2 minutes
let addTime = (extra) => {                                       // executable function to add time for each word entered
    min += extra                                                // adds the time and stores that time in minutes
}
let hangmanPos = () => {
    position -= 200
}

// sudo code

/*
    // to do's
    onClick let user know button was hit some way.  **Need to work on this**
    hide submit and word. ** Need to work on this **
    check for duplicate word entries *Need to work on this.*
    check for empty string entries *Need to work on this.*
    keep track of players right and wrong answers. *Need to work on this* 
    timer starts counting down. *DONE need to work on this* // two 
    hangman sprite in images folder. each sprite 200 apart.
*/

/*
    //bugs
    when player wins the game doesnt show the last letter input until after alert

    when player guesses a word and has some failes but complete the word it should continue to next word with a blank canvas so game doesnt end rapidly.
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