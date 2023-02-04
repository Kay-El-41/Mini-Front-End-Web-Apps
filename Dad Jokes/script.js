const jokeEl = document.getElementById('joke')
const jokeBtn = document.getElementById('jokesbtn')

gernerateJoke ()
jokeBtn.addEventListener('click', gernerateJoke)


// Normal Method
// function gernerateJoke() {
//     const config = {
//         headers: {
//             'Accept': 'application/json'
//         }
//     }

//     fetch('https://icanhazdadjoke.com', config)
//     .then (res => res.json())
//     .then(data => {
//         jokeEl.innerHTML = data.joke
//     })
// }

// Pro Method
async function gernerateJoke() {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    const res = await fetch('https://icanhazdadjoke.com', config)
    // request API
    const data = await res.json()
    // Put API response to a variable
    jokeEl.innerHTML = data.joke
    // Your desire for codes
}
