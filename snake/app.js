let snake = [188, 189, 190, 191]
let direction = 'left'
let appleGrid = []
let score = 0
let gameOver = false

function makeGrid() {
    for (let i = 0; i < 400; i++) {
        $('.grid').append(`<div class="tile" id=${i}></div>`)  //`<div class="tile" id=${i}>${i}</div>` debugging snake movement
    } 
}

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

    if (!wallCollision(snakeHead)) {
        snake.unshift(snakeHead)
    } else {
        return
    }
    
    
    if (snakeHead === appleGrid[0]) { //eating apple
        $(`#${snakeHead}`).removeClass('apple')
        appleGrid.pop()
        score += 1
        $('header').text(`Score: ${score}`)
    } else {
        let tail = snake.pop() 
        $('.grid div')[tail].classList.remove('snake')
    }

    snakeBody();
}

function wallCollision(snakeHead) {
    //console.log('head', snakeHead)
    if ( 
        ( direction === 'left' && (snakeHead % 20 === 19) ) || 
        ( direction === 'up' && (snakeHead < 0) ) || 
        ( direction === 'right' && (snakeHead % 20 === 0) ) || 
        ( direction === 'down' && (snakeHead > 399) ) 
    ) { 
        console.log('hit a wall')
        gameOver = true
        return true
    }
}

function snakeCollision() {
    snakeSections = snake.slice(1)

    snakeSections.forEach(function(part) {
        if (snake[0] === part) {
            console.log('eat', snake)
            gameOver = true
        }
    })
}

function collisionCheck() {
    wallCollision();
    snakeCollision();
}

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

function startGame() {
    makeGrid();
    move = setInterval(moveSnake, 250); 
    crash = setInterval(collisionCheck, 125);
    spawnApple = setInterval(addApple, 250); 
    setInterval(isGameOver, 62.5);
}

startGame();

function isGameOver() {
    if (gameOver) {
        clearInterval(move);
        clearInterval(crash);
        clearInterval(spawnApple);
    }
}

$('button').click(function() {
    location.reload();
})
