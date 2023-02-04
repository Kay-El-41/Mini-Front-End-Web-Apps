const buttonColors = ['red', 'blue', 'green', 'yellow']
let gamePattern = []
let userClickedPattern = []
let level = 1

// Mouse Actions Disabled By Default
mouseDisable()


// Game Start by Enter
jQuery(document).on('keypress', function (e) {
    if (e.key == 'Enter') {
        $('h3').text('Follow the Pattern')
        keyDisable()
        nextLevel()
    }
})


// Game Play by Mouse Click
$('.btn').on('click', function () {
    const userChosenColor = this.id
    userClickedPattern.push(userChosenColor)

    animatePress(userChosenColor)
    playSound(userChosenColor)

    checkAnswer(userClickedPattern.length - 1)
})


// Game Logics
function resetParams() {
    gamePattern = []
    userClickedPattern = []
}


function nextSequence() {
    const randomNumber = Math.floor(Math.random() * 4)
    const randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)
}


function checkAnswer(current) {
    if (userClickedPattern[current] == gamePattern[current]) {
        if (userClickedPattern.length == gamePattern.length) {
            level += 1
            mouseDisable()
            if (!gameWin()) {
                $('h1').text('Prepare for Next Level')
                $('h3').text('Follow Pattern')
                setTimeout(() => {
                    nextLevel()
                }, 1000);
            }
        }
    } else {
        animateOver()
        gameOver()
    }
}


function gameOver() {
    level = 1
    resetParams()
    keyEnable()

    $('h1').text("Game Over!")
    $('h3').text("Press Enter to Restart")
}


function gameWin() {
    if (level == 16) {
        mouseDisable()
        $('h1').text('You Win!!')
        level = 1
        $('h3').text("Press Enter to Restart")
        keyEnable()
        return true
    }
}


function nextLevel() {
    $('h1').text('Level ' + level)
    resetParams()

    let intervalSec = 0
    let sequenceNum = 0

    if (level > 5) {
        intervalSec = 500
    } else if (level > 10) {
        intervalSec = 300
    } else {
        intervalSec = 800
    }

    const sequence = setInterval(function () {
        if (sequenceNum < level) {
            nextSequence()
            sequenceNum += 1
        } else {
            clearInterval(sequence)
            console.log(gamePattern) // Cheat Code
            $('h3').text('Your Turn')
            mouseEnable()
        }
    }, intervalSec)
}


// Sound & Animations

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3")
    audio.play()
}

function animatePress(color) {
    $('#' + color).addClass('pressed')
    setTimeout(() => {
        $('#' + color).removeClass('pressed')
    }, 100);
}

function animateOver() {
    playSound('wrong')
    $('body').addClass('game-over')
    setTimeout(() => {
        $('body').removeClass('game-over')
    }, 100);
}

// Keyboard & Mouse Actions

function keyDisable() {
    document.onkeydown = function (e) { return false }
}

function keyEnable() {
    document.onkeydown = function (e) { return true }
}

function mouseDisable() {
    $(".btn").css('pointerEvents', 'none')
}

function mouseEnable() {
    $(".btn").css('pointerEvents', 'auto')
}

