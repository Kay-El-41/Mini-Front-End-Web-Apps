const APIURL = "https://api.github.com/users/"

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getUser("florinpop17")

async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username)
        createUserCard(data)
        getRepos(username)
    } catch (err) {
        if (err.response.status == 404) {
            createErrorCard("No profile with this username.")
        }
    }
}


async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + "/repos?sort=created")
        addRepoToCard(data)
    } catch (err) {
        if (err.response.status == 404) {
            createErrorCard("Problem fetching repos. Try again later.")
        }
    }
}


function createUserCard(user) {
    const cardHTML = `
    <div class="card">
        <div>
            <img src=${user.avatar_url} alt="" class="avatar">
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul>
                <li>${user.followers} <strong>Follower</strong></li>
                <li>${user.following} <strong>Following</strong></li>
                <li>${user.public_repos} <strong>Repos</strong></li>
            </ul>
            <h4>Latest 10 Repos</h4>
            <div class="repos" id="repos">
            
            </div>
        </div>
    </div>`
    main.innerHTML = cardHTML
}


function createErrorCard(errorMessage) {
    const cardHTML = `
    <div class = "card"><h1>${errorMessage}</h1></div>`
    main.innerHTML = cardHTML
}


function addRepoToCard(repos) {
    const reposEl = document.getElementById('repos')
    repos.slice(0, 10).forEach(repo => {
        const repoLink = document.createElement('a')
        repoLink.classList.add('repo')
        repoLink.href = repo.html_url
        repoLink.target = "_blank"
        repoLink.innerText = repo.name

        reposEl.appendChild(repoLink)
    });
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const user = search.value
    if (user) {
        getUser(user)
        search.value = ''
    }
})