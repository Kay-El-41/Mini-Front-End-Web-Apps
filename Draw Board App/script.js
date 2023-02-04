const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const colorPicker = document.getElementById('color')
const clearAll = document.getElementById('clear')
const incButton = document.getElementById('increase')
const decButton = document.getElementById('decrease')
const sizeSpan = document.getElementById('size')


let isPressed = false
let size = parseInt(sizeSpan.innerHTML)
let color = 'black'
let x
let y

colorPicker.addEventListener('input', (e) => color = e.target.value, false);
colorPicker.addEventListener("change", (e) => color = e.target.value, false);

incButton.addEventListener('click', () => sizeCanger('inc'))
decButton.addEventListener('click', () => sizeCanger('dec'))

canvas.addEventListener('mousedown', (e) => {
    isPressed = true
    x = e.offsetX
    y = e.offsetY
})

canvas.addEventListener('mouseup', () => {
    isPressed = false
    x = undefined
    y = undefined
})

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX
        const y2 = e.offsetY

        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)

        x = x2
        y = y2
    }
})

clearAll.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

function drawCircle(x, y) {
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    // a border line like thing
    ctx.lineWidth = 2 * size
    ctx.stroke()
}

function sizeCanger(mode) {
    switch (mode) {
        case 'inc':
            size++
            break
        case 'dec':
            size--
            break
    }
    sizeSpan.innerHTML = size
}