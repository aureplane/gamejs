const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const divPhrase = document.getElementById('phrase');
const ul = divPhrase.firstElementChild;
const startButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const buttonsKeyboard = document.querySelectorAll('button');
const header = document.querySelector('#overlay .title');
let heartImg = document.querySelectorAll('.tries img');
let missed = 0;

const phrases = [
	'I hate the coronavirus',
	'Amsterdam is the best',
	'I bought a laptop',
	'I love pizza',
	'I painted my living room'
];

function getRandomPhraseAsArray(arr){
    let randomPhrase = arr[Math.floor(Math.random() * arr.length)]
    randomPhrase = randomPhrase.split('');
    return randomPhrase;
} 

function addPhraseToDisplay(arr) {
	for (let i = 0; i < arr.length; i++) {
		let li = document.createElement('li');
		li.textContent = arr[i];
			if (arr[i] !== ' ') {
				li.className = 'letter';
			} else {
				li.className = 'space';
			}
		ul.appendChild(li);
	}	
}

function checkletter (letterClicked) {
	let letterMatch = null;
	const isLetter = document.querySelectorAll('.letter');
	for (let i = 0; i < isLetter.length; i++) {
		if (isLetter[i].textContent.toLowerCase() == letterClicked) {
			isLetter[i].className += " show";
			letterMatch = isLetter[i].textContent;
		}
	}
	return letterMatch;
}

function checkWin() {
	let liLetter = document.querySelectorAll('.letter');
	let liShow = document.querySelectorAll('.show');
	if (liLetter.length === liShow.length) {
		overlay.className = "win";
		header.textContent = "You won! Congrats!";
		overlay.style.display = "flex";
		startButton.textContent = "Play again!";
		reset();
	} else if (missed > 4) {
		overlay.className = "lose";
		header.textContent = "You lost! Loser!";
		overlay.style.display = "flex";
		startButton.textContent = "Wanna try again?";
		reset();
	}
}

function reset() {
	missed = 0;
	ul.textContent = '';
	for (let i = 0 ; i < buttonsKeyboard.length ; i++) {
		buttonsKeyboard[i].className = "";
		buttonsKeyboard[i].disabled = false;
	}
	let heart = document.querySelectorAll('#scoreboard li');
	for (let i = 0; i < heart.length; i++) {
		heartImg[i].src = "images/liveheart.png";
		heart[i].className = "tries";
	}
}

startButton.addEventListener('click', (e) => {
	overlay.style.display = 'none';
	reset();
	const phraseArray = getRandomPhraseAsArray(phrases);
	addPhraseToDisplay(phraseArray);
});

qwerty.addEventListener ('click', (e) => {
	if (e.target.tagName === 'BUTTON') {
		const buttonClicked = e.target;
		buttonClicked.className = 'chosen'; 
		buttonClicked.setAttribute("disabled", "");
		const buttonClickedValue = buttonClicked.textContent;
		const letterFound = checkletter(buttonClickedValue);
		if (letterFound === null) {
				let liTries = document.querySelectorAll('.tries');
				let heartImg = document.querySelectorAll('.tries img')
				missed += 1 ;
				heartImg[0].src = "images/lostheart.png";
				liTries[0].className = "";
		}
		checkWin();
	}
});