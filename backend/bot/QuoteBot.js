const R = require('ramda');

const {USER_BOT, replyTemplates}  = require('./config.js');

class QuoteBot {

    constructor () {
        this.generateReplyBody = this.generateReplyBody.bind(this);
        this.generateReply = this.generateReply.bind(this);
    }

    generateReplyBody() {
      return replyTemplates.quote[Math.floor(Math.random()*replyTemplates.advice.length)]
    }

    generateReply() {
        return {
            body: this.generateReplyBody(),
            sendingTime: new Date (),
            sender: USER_BOT
        }
    }
}

module.exports = QuoteBot;