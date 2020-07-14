let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');

let botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg"; //global variable so it can be accessed outside function.
let beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
let spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
let closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;

let startButton = document.getElementById('start');
let currentlyPlaying = true;

doorImage1.onclick = () => {
  if (!isClicked(doorImage1) && currentlyPlaying) {
  doorImage1.src = openDoor1; //doorImage1, when clicked, always changes the src to whatever openDoor1's is. But the src itself changes depending on randomChoreDoor generator.
  playDoor(doorImage1);
  }
};

doorImage2.onclick = () => {
  if (!isClicked(doorImage2) && currentlyPlaying) {
  doorImage2.src = openDoor2;
  playDoor(doorImage2);
  };
};

doorImage3.onclick = () => {
  if (!isClicked(doorImage3) && currentlyPlaying) {
  doorImage3.src = openDoor3;
  playDoor(doorImage3);
  };
};

startButton.onclick = () => {
  if (!currentlyPlaying) {
  startRound();
  };
};


let randomChoreDoorGenerator = () => {
 let choreDoor = Math.floor(Math.random() * numClosedDoors);
 if (choreDoor == 0) {
  openDoor1 = botDoorPath;
  openDoor2 = beachDoorPath;
  openDoor3 = spaceDoorPath;
 } else if (choreDoor == 1) {
  openDoor2 = botDoorPath;
  openDoor1 = beachDoorPath;
  openDoor3 = spaceDoorPath;
 } else if (choreDoor == 2) {
  openDoor3 = botDoorPath;
  openDoor1 = spaceDoorPath;
  openDoor2 = beachDoorPath;
 };
 };

let isBot = (door) => {
 if (door.src === botDoorPath) {
   return true;
 } else {
   return false;
 }
};

let isClicked = door => {
 if (door.src === closedDoorPath) {
   return false;
 } else {
   return true;
 };
};


let playDoor = door => {
 numClosedDoors -= 1;
 if (numClosedDoors === 0) {
   gameOver('win');
 } else if (isBot(door)) {
   gameOver();
 }
};

let gameOver = status => {
 if (status === 'win') {
 startButton.innerHTML = 'You win! Play again?';
 } else {
 startButton.innerHTML = 'Game over! Play again?';
 };
 currentlyPlaying = false; //This means when gameOver is called, currentlyPlaying is false, so the doors can't be clicked anymore. gameOver will be called when startButton's text changees - i.e. when isBot = true (as it shows the bot) or when numClosedDoors = 0.
};

let startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = 'Good Luck';
  currentlyPlaying = true;
  randomChoreDoorGenerator();
};


randomChoreDoorGenerator();
