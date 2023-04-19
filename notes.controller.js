const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')
const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString()
  }
  notes.push(note)
  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.bgGreen('Note was added!'))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
  const notes = await getNotes()
  console.log(chalk.bgBlue('Here is the list of notes:'))
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title))
  })
}

async function removeNoteById(removeId) {
  const notes = await getNotes()
  const filteredNotes = notes.filter((note) => note.id != removeId)
  await fs.writeFile(notesPath, JSON.stringify(filteredNotes))
  console.log(chalk.bgGreen(`Note with id=${removeId} was removed!`))
}

async function editNote(data) {
  const notes = await getNotes()
  const newNote = JSON.parse(data)
  const newNotes = notes.map((note) => {
    if (note.id === newNote.id) {
      note.title = newNote.title
    }
    return note
  })
  await fs.writeFile(notesPath, JSON.stringify(newNotes))
  console.log(chalk.bgCyan('Note was edited!'))
}

module.exports = {
  addNote,
  printNotes,
  removeNoteById,
  getNotes,
  editNote
}
