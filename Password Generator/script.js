const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numberEl = document.getElementById('numbers')
const symbolEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
}

clipboardEl.addEventListener('click', () => {
    const password = resultEl.innerText

    if (!password) {
        return ''
    }

    /* Old Method 
    const textArea = document.createElement('textarea')
    textArea.value = password
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
    alert('Password copied') */

    // New ES6 Method
    navigator.clipboard.writeText(password).then(() => {
        alert("Copied to clipboard");
    });
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    // + converts that into integer
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numberEl.checked
    const hasSymbol = symbolEl.checked

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatePassword = ''
    const typeCount = lower + upper + number + symbol
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0])
    console.log(typesArr)
    // filters out only false=0 values

    if (typeCount == 0) {
        return ''
    }

    for (let j = 0; j < length; j += typeCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0] // get type [0] as keys
            generatePassword += randomFunc[funcName]()
        })
    }
    const finalPassword = generatePassword.slice(0, length)
    return finalPassword
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    // the numbers are obtained from HTML ASCII Numbers
    // LowerCase starts at 97
    // 26 Because there are 26 characters!
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]-+=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}

