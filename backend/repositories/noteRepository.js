require('../db');
const Repository = require('./generalRepository');
const Note = require('../db/schemas/notes');

class NoteRepository extends Repository {
    constructor() {
        super();
        this.model = Note;
    }

    getByTitle(title) {
        return this.model.find({'title': title});
    }

    deleteByTitle(title) {
        return this.model.remove({title: title});
    }

}

module.exports = new NoteRepository();