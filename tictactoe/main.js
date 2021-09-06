const pickX = "x"
const pickO = "o"
const WINNER =[
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6],
    ]

const cells = document.querySelectorAll("[data-cell]")
const board = document.querySelector("[data-board]")
const messageText = document.querySelector("[data-message]")
const reset = document.getElementById("reset")
const messageElement = document.getElementById("box")
let xTurn

start()

reset.addEventListener("click", start)

function start() {
    xTurn = true
    cells.forEach(cell => {
        cell.classList.remove(pickX)
        cell.classList.remove(pickO)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, {once: true})
    })
    setBoardTurn()
    messageElement.classList.remove("show")
}


function handleClick(e) {
    const cell = e.target
    const currentClass = xTurn ? pickX : pickO
    placeMark(cell, currentClass)

   if (checkWin(currentClass)) {
       endGame(false)
   } else if (isDraw()) {
       endGame(true)
   }
    switchTurns()
    setBoardTurn()

}

function endGame(draw) {
    if (draw) {}
    else {
        messageText.innerText = xTurn ? 'X Wins' : 'O Wins'
    }
    messageElement.classList.add("show")
}

function isDraw() {
    return [...cells].every(item => {
        return item.classList.contains(pickO) || item.classList.contains(pickX)
    })
}


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function switchTurns(){
    xTurn = !xTurn
}

function setBoardTurn() {
    board.classList.remove(pickX)
    board.classList.remove(pickO)
    if (xTurn) {
        board.classList.add(pickX)
    } else {
        board.classList.add(pickO)
    }
}

function checkWin(currentClass) {
    return WINNER.some(combo => {
        return combo.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
}