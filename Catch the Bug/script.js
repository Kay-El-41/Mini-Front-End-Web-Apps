const screens = document.querySelectorAll('.screen')
const chooseInsect_btns = document.querySelectorAll('.choose-insect-btn')

const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')

const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const messageEl = document.getElementById('message')

const annoyedBtn = document.getElementById('yes_annoyed')
const notAnnoyedBtn = document.getElementById('no_annoyed')

let seconds = 0
let score = 0
let selectedInsect = {}
let annoyed = false
let click_count = 0

start_btn.addEventListener('click', () => screens[0].classList.add('up'))



chooseInsect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')

        selectedInsect = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createInsect, 1000)
        startGame()
    })
})


function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 10
    m = m < 10 ? `0${m}` : m
    s = m < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createInsect() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const { x, y } = getRandomLocation()
    insect.style.top = y + 'px'
    insect.style.left = x + 'px'
    insect.innerHTML = `
    <img src = ${selectedInsect.src} alt=${selectedInsect.alt} style="transform: rotate(${Math.random() * 360}deg)"/>`

    insect.addEventListener('click', catchInsect)

    game_container.appendChild(insect)
}

function getRandomLocation() {
    const winX = window.innerWidth
    const heiY = window.innerHeight

    const x = Math.random() * (winX - 200) + 100
    // -200 and 100 is set for margins
    const y = Math.random() * (heiY - 200) + 100

    return { x, y }
}

function catchInsect() {
    increaseScore()
    this.classList.add('caught')
    // this refers to insect that was clicked
    setTimeout(() => this.remove(), 2000)
    addInsects()
}

function addInsects() {
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1500)
}

function increaseScore() {
    score++
    click_count++
    scoreEl.innerHTML = `Score ${score}`

    if (!annoyed && score > 14) {
        messageEl.classList.add('visible')
    }

    if (click_count == 15) {
        // very 15 clicks, user is going to get annoyed!!
        annoyed = false
    }

    notAnnoyedBtn.addEventListener('click', () => messageEl.classList.remove('visible'))
    annoyedBtn.addEventListener('click', () => {
        annoyed = true
        click_count = 0
        messageEl.classList.remove('visible')
    }
    )
}