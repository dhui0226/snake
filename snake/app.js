let snake = [188, 189]
let direction = 'left'
let appleGrid = []

function makeGrid() {
    for (let i = 0; i < 400; i++) {
        $('.grid').append(`<div class="tile" id=${i}></div>`)  //`<div class="tile" id=${i}>${i}</div>` debugging snake movement
    } 
}

makeGrid();

$(document).keydown(function(event) {
    if (event.which === 37 && direction !== 'right') {
        direction = 'left'
    } else if (event.which === 38 && direction !== 'down') {
        direction = 'up'
    } else if (event.which === 39 && direction !== 'left') {
        direction = 'right'
    } else if (event.which === 40 && direction !== 'up') {
        direction = 'down'
    }
})

function snakeBody() {
    snakePositions = snake.forEach(function(tile) {
        let grid = $('.grid div')
        console.log(tile)
        grid[tile].classList.add('snake')
    })
}

function moveSnake() {
    let snakeHead = snake[0]
    
    if (direction === 'left') {
        snakeHead -= 1
    } else if (direction === 'up') {
        snakeHead -= 20
    } else if (direction === 'right') {
        snakeHead += 1
    } else if  (direction === 'down') {
        snakeHead += 20
    }

    //console.log(direction)
    snake.unshift(snakeHead)
    
    if (snakeHead === appleGrid[0]) {
        $(`#${snakeHead}`).removeClass('apple')
        appleGrid.pop()
    } else {
        let tail = snake.pop() 
        $('.grid div')[tail].classList.remove('snake')
    }

    snakeBody();
}

let move = setInterval(moveSnake, 250); 

function collisionCheck() {
    //wall collision check
    console.log('head', snake[0]) 
    if ( 
        direction === 'left' && (snake[0] % 20 === 19) || 
        direction === 'up' && (snake[0] < 0) || 
        direction === 'right' && (snake[0] % 20 === 0) || 
        direction === 'down' && (snake[0] > 399) 
    ) { 
        console.log('hit a wall')
        clearInterval(move);
        clearInterval(check) 
    }
}

function snakeCollision() {
    snakeSections = snake.slice(1)

    snakeSections.forEach(function(part) {
        if (snake[0] === part) {
            console.log('eat', snake)
            clearInterval(move)
            clearInterval(check)
            clearInterval(snackey)
        }
    })
}

let check = setInterval(collisionCheck, 500);
let snackey = setInterval(snakeCollision, 500); 

function randomNumber(max) {
    return Math.floor(Math.random() * max)
}

function addApple() {  
    if (appleGrid.length < 1) {
        apple = randomNumber(399);

        appleGrid.push(apple)

        $(`#${apple}`).addClass('apple')
    }
}

setInterval(addApple, 2000); 
