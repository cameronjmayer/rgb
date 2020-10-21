//sets the variable number of squares to 6//
var numSquares = 6;
//Determines the colors//
var colors = [];
//placeholder variable for the correct color option//
var pickedColor;
//squares means all the square classes//
var squares = document.querySelectorAll(".square");
//Determines the color of an element//
var colorDisplay = document.getElementById("colorDisplay");
//displays the message variable in element id "message"//
var messageDisplay = document.querySelector("#message");
//h1 means manipulate h1//
var h1 = document.querySelector("h1");
//Will activate the effect from the reset id//
var resetButton = document.querySelector("#reset");
//Will change the mode base don the class "mode"//
var modeButtons = document.querySelectorAll(".mode");
//Default score is 0//
var score = 0; 
//the Scor dispay is connected to the id "scoreDisplay"//
var scoreDisplay = document.querySelector("#scoreDisplay"); 
//if the reset button is pressed, the function will happen//
var resetPressed = true; 

//Initiates the page//
init();

//prints mode buttons, squares, and sets the score//
function init(){
	setupModeButtons();
	setupSquares();
	var lsScore = sessionStorage.getItem('score');
	if( lsScore !== null ){
		score = lsScore; 
		scoreDisplay.textContent = score;
	}
	else {
		sessionStorage.setItem('score', score); 
	}
	reset();
}

//sets the mode buttons to the page//
function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

//sets the squares up in the page//
function setupSquares(){
	for(var i = 0; i < squares.length; i++){
	//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.background;
			//compare color to pickedColor
			if(clickedColor === pickedColor){ 
				updateColorName();
				//console.log(colorName);
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?"
				changeColors(clickedColor);
				h1.style.background = clickedColor;
				if(resetPressed){
					score+=5; 
					resetPressed = false;
				}
				scoreDisplay.textContent = score;
				sessionStorage.setItem('score', score);
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again"
				score--;
				scoreDisplay.textContent = score; 
				sessionStorage.setItem('score', score);
			}
		});
	}
}

//Changes the color name when correctly clicked//
async function updateColorName(){
	const regex = /\([^\)]+\)/g; 
	var rgbColors = pickedColor.match(regex); 
	const url = "https://www.thecolorapi.com/id?rgb="+rgbColors[0];
	var requestOptions = {
	  method: 'GET',
	  redirect: 'follow'
	};

	let result = await fetch(url, requestOptions); 
	let colorData = await result.json(); 

	if(colorData.name.exact_match_name) {
		colorDisplay.textContent = colorData.name.value; 
	}
	else {
		colorDisplay.textContent = colorData.name.value + "-ish"; 
	}
}
//when pressed, resets the square's colors, as well as the new picked color and question//
function reset(){
	resetPressed = true;
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors"
	messageDisplay.textContent = "";
	//change colors of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block"
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
})

//Changes the cool of the square//
function changeColors(color){
	//loop through all squares
	for(var i = 0; i < squares.length; i++){
		//change each color to match given color
		squares[i].style.background = color;
	}
}
//Randomly selects a color//
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}
//Generates random colors for the squares//
function generateRandomColors(num){
	//make an array
	var arr = []
	//repeat num times
	for(var i = 0; i < num; i++){
		//get random color and push into arr
		arr.push(randomColor())
	}
	//return that array
	return arr;
}
//ranodomizes a color from a list//
function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from  0 -255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from  0 -255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}