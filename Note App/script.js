const addBtn = document.getElementById('add')

// Display notes in the local stroage when reload
const notes = JSON.parse(localStorage.getItem('notes'))
if (notes) {
    // if there are notes, make each note to note
    notes.forEach(note => addNewNote(note))
}


addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = "") { // set the original argument to nothing!
    const note = document.createElement('div')
    note.classList.add('note')
    note.innerHTML = `
        <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? " " : "hidden"}"></div>
        <textarea class=${text ? "hidden" : " "}></textarea>
        
        `
    // div is set to disable if there is no text by default new note.
    // text area is set to disable even if there is text by default.
    // text area and div must have alternate hidden, so if there is no div, text will be able to edit,
    // if there is no textarea, div will show texts instead of textarea disabling editing

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked.parse(text)
    // these are set for local stroage reading

    deleteBtn.addEventListener('click', () => {
        note.remove()
        updateLS() // update local storage after removing so there is no repeat next time
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target // use array destructuring to get texts
        main.innerHTML = marked.parse(value)
        updateLS()
    })
    // this concept works like copying all text from text area to div
    // then hide the text area, and only show the div
    document.body.appendChild(note)
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))
    localStorage.setItem('notes', JSON.stringify(notes))
}

// How local Storage Worker in Simple,
// The stored item must be a string, so use JSON.stringify
// localStorage.setItem('name', 'Brad')
// localStorage.getItem('name')
// localStorage.removeItem('name')

// There is also sessionStorage, it will stay until you closed the browser and it will clear automatically