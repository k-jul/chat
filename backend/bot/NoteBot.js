const R = require('ramda');

const {USER_BOT, replyTemplates}  = require('./config.js');
const notesService = require('../services/notes')

const noteBotMethodMapping = {
    save: notesService.createNewNote,
    getAll: notesService.getAll,
    getByTitle: notesService.getNoteByTitle,
    delete: notesService.deleteNoteByTitle
}

class NoteBot {

    constructor (action, title = '', body = '') {
        this.title = title;
        this.body = body;
        this.action = action;
        this.generateReplyBody = this.generateReplyBody.bind(this);
        this.generateReply = this.generateReply.bind(this);
    }

    static findKeyWords (initialMsgBody) {
           switch (true) {
               case R.test(/save note/, initialMsgBody.toLowerCase()):
                    const [title, body] = initialMsgBody.replace(/("|“|”)/g,'').split('title: ')[1].split(' body: ');
                    return ["save", title, body];
               case R.test(/note list$/, initialMsgBody.toLowerCase()):
                    return ['getAll', '', ''];
               case R.test(/show note .+/, initialMsgBody.toLowerCase()):
               case R.test(/delete note/, initialMsgBody.toLowerCase()):
               default:
           }               
    }

    generateReplyBody(data) {
       switch (this.action) {
           case "save": 
            return replyTemplates.notes.saved.replace('{{title}}', data.title);

           case "getAll": 
                return data.reduce((allNotes, note) => {
                    return `${allNotes}
                    <br/>
                    <br/>
                    ----------------
                    <br/>
                    <br/>
                    
                    <b>${note.title}</b>
                    <br/>
                    ${note.body}
                    `
                }
                ,'<b>YOUR NOTES:</b>')
       }
    }

    async generateReply() {

        const data = await noteBotMethodMapping[this.action](this.title, this.body)

        return {
                    body: this.generateReplyBody(data),
                    sendingTime: new Date(),
                    sender: USER_BOT
                }
    }
}

module.exports = NoteBot;