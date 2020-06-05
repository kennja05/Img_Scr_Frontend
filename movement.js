
let currentPosition = { x: 0, y: 0 } //starts off at bottom right
let prevTile;
NodeList.prototype.find = Array.prototype.find
//let timeLapsed = null
function start() {
  let button = document.getElementById('start')
  let p = document.getElementById('statement?')
  p.style.display = 'none'
  button.addEventListener('click', (event) => {
    let button = document.getElementById('start')
    let moveCount = document.getElementById('move number')
    let time = document.getElementById('timer')
    makeTheGame()
    if (button.innerText == 'start game'){
    button.innerText = 'reshuffle'
    clock('start')
  }else if(button.innerText == 'play again'){
    p.innerText = 'false'
    moveCount.innerText = 0
    time.innerText = "00:00:00"
    button.innerText = 'reshuffle'
    // let audio = new Audio('./assets/audio/NotGudEnuff.mp3')
    // playMusic(audio)
    resetClock()
    clock('start')
  }else{
    p.innerText = 'false'
    moveCount.innerText = 0
    time.innerText = "00:00:00"
    // let audio = new Audio('./assets/audio/idiotSandwich.mp3')
    resetClock()
    // playMusic(audio)
  }
})
  
}
function resetClock(){
  minute = 00
  hour = 00
}

function playMusic(audio){
  audio.play()
}

function clock(boolean) {
  if(boolean == 'stop'){
    clearInterval(timeLapsed)
  }
  if (document.getElementById('timer').innerText == "00:00:00") {
    timeLapsed = setInterval(incrementTimer, 1000)
  }
}

let separateCounter
let oneZeroSecond
let oneZeroMinute
let oneZeroHour
let timeSplit
let minute = 00
let hour = 00
function incrementTimer() {
  let timer = document.getElementById('timer')
  let splitTime = timer.innerText.split(':')
  timeSplit = splitTime[2]
  let seconds = parseInt(timeSplit) + 1
  separateCounter = seconds
  if (separateCounter >= 60) {
    minute += 1
    seconds = 0
    console.log(minute)
  }
  if (minute >= 60) {
    hour += 1
    minute = 0
  }
  if (seconds < 10) { oneZeroSecond = '0' + seconds } else { oneZeroSecond = seconds }
  if (minute < 10) { oneZeroMinute = '0' + minute } else { oneZeroMinute = minute }
  if (hour < 10) { oneZeroHour = '0' + hour } else { oneZeroHour = hour }
  timer.innerText = oneZeroHour + ':' + oneZeroMinute + ':' + oneZeroSecond
}

function makeTheGame(){
  const gameStarted = document.getElementById("gamestarted")
  gameStarted.innerHTML = "true"
  const board = document.getElementById('board')
  const non_perverted_board = [...board.children]
  const array = [...board.children]
  let newGame = []
  newGame = array.sort(function (a, b) { return 0.5 - Math.random() })
  while (board.firstChild) {
    board.firstChild.remove()
  }
  for (let i = 0; i < newGame.length; i++) {
    board.insertAdjacentHTML("beforeend", `
    <div class="tile" style="transform: translate(${non_perverted_board[i].dataset.x * 100}%,${non_perverted_board[i].dataset.y * 100}%)" data-x=${non_perverted_board[i].dataset.x} data-y=${non_perverted_board[i].dataset.y} id="${newGame[i].id}"></div>
    `)
  }
  const tile = document.querySelector('#empty');

  currentPosition = tile.dataset
  prevTile = tile;
  renderBox(currentPosition)
}
function check() {
  let currentPos = Array.from(document.getElementsByClassName('tile')).map(div => div.id).slice(0, 9)
  let solution = ["empty", "piece1", "piece2", "piece3", "piece4", "piece5", "piece6", "piece7", "piece8"]
  if (JSON.stringify(currentPos) === JSON.stringify(solution)) {
    sleep(210).then(() => solvedPuzzle())
  }
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function solvedPuzzle() {
  let moveCount = document.getElementById('move number').innerText
  let time = document.getElementById('timer').innerText
  
  if(moveCount != 0){
    let p = document.getElementById('statement?')
    if(p.innerText == 'false'){
      let array = ['./assets/audio/GuyFieri1.mp3','./assets/audio/GuyFieri2.mp3','./assets/audio/GuyFieri3.mp3','./assets/audio/GuyFieri4.mp3']
      let someIndex = Math.floor(Math.random() * Math.floor(array.length))
      let audio = new Audio(array[someIndex])
      audio.play()
      
      p.innerText = 'true'
      let user = prompt(`Puzzle solved in ${moveCount} moves in ${time}! Post your score by providing your name below`, 'Anonymous Guy Fieri Fan')
      clearLeaderboard()
      addPlayerToLeader(moveCount, time, user)
      let button = document.getElementById('start')
      clock('stop')
      button.innerText = 'play again'
      }else{
        console.log('you planning on cheating m2^3?')
      }
  }
}

function addPlayerToLeader(moves, timeSpent, userInput){
    gameObj = {username: userInput, moves: parseInt(moves), time: timeSpent}
    fetch('http://localhost:3000/api/v1/games', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gameObj)
    })
    .then(e => {
      fetch('http://localhost:3000/api/v1/games')
      .then(resp => resp.json())
      .then(games => games.forEach(game => createLi(game)))
    })
}

function clearLeaderboard(){
  let leaderList = document.getElementById('leaderboard');
  leaderList.innerHTML = ''
}

function createGrid() {
  const setTheory = ["empty", "piece1", "piece2", "piece3", "piece4", "piece5", "piece6", "piece7", "piece8"]
  const board = document.querySelector("#board")
  const start = document.getElementById('start')
  start.innerText = 'start game'
  let counter = 0
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board.insertAdjacentHTML("beforeend", `
        <div class="tile" style="transform: translate(${j * 100}%,${i * 100}%);" data-x=${j} data-y=${i} id="${setTheory[counter]}"></div>
        `)
      counter += 1
    }
  }
}
function smartCounting() {
  let count = document.getElementById('move number')
  let p = document.getElementById('statement?')
  counting = parseInt(count.innerText)
  if(p.innerText == 'false'){
  count.innerHTML = counting + 1
  }
  if(p.innerText == 'true'){
    console.log('your move count isnt going up')
  }
}

function renderBox(targetPosition) {
  const tiles = document.querySelectorAll(".tile")
  const gameStarted = document.getElementById("gamestarted")
  gameStarted.style.display = "none";
  const additionalCounter = document.getElementById('countingnumbers')
  additionalCounter.style.display = 'none'

  const newTile = tiles.find(function (tile) {
    return parseInt(tile.dataset.x) == parseInt(targetPosition.x) && parseInt(tile.dataset.y) == parseInt(targetPosition.y)
  })
  if (!newTile) {
    return false;
  } else {
    if (prevTile) {
      if (gameStarted.innerText == "true") {
        if (parseInt(additionalCounter.innerText) >= 1) {
          smartCounting()
        }
        additionalCounter.innerText = parseInt(additionalCounter.innerText) + 1
      }
      prevTile.id = newTile.id

    }

    prevTile = newTile
    newTile.id = "empty"
    check()
    return true
  }

}

function move(direction) {
  let x = currentPosition.x;
  let y = currentPosition.y;
  switch (direction) {
    case "left":
      x--
      break;
    case "right":
      x++
      break;
    case "up":
      y--
      break;
    case "down":
      y++
      break;
  }

  const moved = renderBox({ x, y })
  if (moved) {
    currentPosition = { x, y }
  }
}