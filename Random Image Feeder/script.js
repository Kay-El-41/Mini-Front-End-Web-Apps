const unSplashURL = 'https://source.unsplash.com/random/'

const container = document.querySelector('.container')

const rows = 10

for (let i = 0; i < rows * 3; i++) {
    const img = document.createElement('img')
    img.src = `${unSplashURL}${getRandomSize()}`
    container.appendChild(img)
}

function getRandomSize() {
    return `${getRandom()}x${getRandom()}`
}

function getRandom() {
    return Math.floor(Math.random() * 10) + 300
}