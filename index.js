document.addEventListener("DOMContentLoaded", function () {
  createGrid()
  renderBox(currentPosition)
  start()
  document.addEventListener('keydown', function (e) {
    const moveLi = document.createElement('li')
    if (e.key === "ArrowRight") {
      move('right')
      moveLi.innerText = 'Right'
    } else if (e.key === "ArrowDown") {
      move('down')
      moveLi.innerText = 'Down'
    } else if (e.key === "ArrowUp") {
      move('up')
      moveLi.innerText = 'Up'
    } else if (e.key === "ArrowLeft") {
      move('left')
      moveLi.innerText = 'Left'
    }
  })

  const leaderBoard = function(){
    fetch('http://localhost:3000/api/v1/games')
    .then(resp => resp.json())
    .then(games => games.forEach(game => createLi(game)))
  }
  leaderBoard()
})

function createLi(gameInstance) {
  const time = gameInstance.time.split(':')
  const hours = time[0]
  const minutes = time[1]
  const seconds = time[2]
  const li = document.createElement('li')
  const ol = document.getElementById('leaderboard')
  li.innerHTML = `
    <p class="leader"><b>Name: </b>${gameInstance.username}
    <ul><li>
    <b>Move Count: </b>${gameInstance.moves}</li>
    <li><b>Time Taken: </b>${hours} hours, ${minutes} minutes, and ${seconds} seconds</li><ul></p>`
  ol.append(li)  
}