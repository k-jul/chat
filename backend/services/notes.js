const Note = require('../repositories/noteRepository');

function getAll () {
    return Note.getAll();
};

function getNoteByTitle (title) {
    return Note.getByTitle(title);
};

function createNewNote (title, body) {
    return Note.create({title, body});
};

function deleteNoteByTitle (title) {
    return Note.deleteByTitle(title);
};


module.exports = {
    getAll,
    getNoteByTitle,
    createNewNote,
    deleteNoteByTitle
}