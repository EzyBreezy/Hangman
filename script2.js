// Have a player enter a word inside "theInput" and save the word inside an array "fullWordEntered"
const theInput = document.getElementById("word");
const submit = document.getElementById("submit"); // submit button on html
const start = document.getElementById("start")
//images of hangman
let hangman1 = "hangman_image/1.png";
let hangman2 = "hangman_image/2.png";
let hangman3 = "hangman_image/3.png";
let hangman4 = "hangman_image/4.png";
let hangman5 = "hangman_image/5.png";
let hangman6 = "hangman_image/6.png";
let hangman7 = "hangman_image/7.png";
let hangman8 = "hangman_image/8.png";

let fullWordEntered = []; //stores word inside an array #
let wordEntrySplit = []; // wordEntrySplit splits the fullWordEntered word into individual letters #
let letterPads = []; //space for letters

let winner = []; //stores good letters //count the array.length to see if player won
let loser = []; //stores bad letters //count the array.length to keep track of hangman
let crosscheck = []; // keychecked used

let i = 0; //loop

submit.addEventListener("click", function checkValue() {
  if (fullWordEntered.length === 0) {
    fullWordEntered.push(theInput.value);
    wordEntrySplit.push(theInput.value.split(""));
    console.log(fullWordEntered);
    console.log(wordEntrySplit[0]);
    document.getElementById("word").value = "";

    // theInput.style.visibility = "hidden";
    // submit.style.visibility = "hidden";
    alert("good choice (^_^)");
  }
  document.addEventListener("keypress", function keyCheck(event) {
    if (wordEntrySplit[0].length - 1 > winner.length || loser.length < 7) {
      crosscheck.push(event.key);
      console.log(wordEntrySplit[0].length - 1, winner.length)
      charFilter();
    }

      // how to check key
      // when key is pressed
      // check that key against all keys in word area
      // if key is right place in right box
      // or
      // if key is wrong put in wrong box
      function check(a,b) {
        a === b
      }
///////////////////////////////////////////////////////////////////////    
    function charFilter() { //gets called from eventlistener for key
      for (let j = 0; j < crosscheck.length; j++) { //crosscheck.length stores the key inputs
        //console.log("the loop is fine");
        if (i === j) { // if the value of i is the same as j then run
          if (1 + wordEntrySplit[0][i] === crosscheck[i]) { // if wordsplit is the same as crosscheck 
            
            //wordEntrySplit[0].indexOf(crosscheck).push(crosscheck)
            winner.push(crosscheck[i]); // push the letter in index up
            //crosscheck.value = ""; // i wanted to delete the letters after but doesnt work
            console.log("test for winner ", winner, "the value of i is: ", i); // tells me what its got
            i++; // adds 1 to index
          } else if (1 + wordEntrySplit[0][i] !== crosscheck[i]) {

            // currently the guessed letter has to be in the index of i
            // but if value is more than that needs to be checked
            // how to do this. probably forEach with a returned value maybe
            //console.log(wordEntrySplit[0].some(crosscheck))
            loser.push(crosscheck[i]); //push the winning value up
            crosscheck.value = "";
            console.log("test for loser ", loser, "the value of i is ", i);
            i++;
          }
        }
      }
    }
///////////////////////////////////////////////////////////////////////


  });
});
// WE WANT TO CHECK THE LAST PRESSED LETTER AGAINST EACH OF THE LETTERS IN THE WORDBANK




//Sudo Code
/*

word is entered inside input field

word is stored inside a variable

player enters letter through keyboard

letter is stored inside a variable
if statement cross checks if letter is a repeat letter or not
letter is cross checked if letter matches any letter



*/