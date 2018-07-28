const R = require('ramda');

const {USER_BOT, replyTemplates}  = require('./config.js');

class WeatherBot {

    constructor (day, city) {
        this.day = day;
        this.city = city;
        this.generateReplyBody = this.generateReplyBody.bind(this);
        this.generateReply = this.generateReply.bind(this);
    }

    static findKeyWords (initialMsgBody) {
        return R.compose(
            R.split(' in '),
            R.nth(1),
            R.split('weather '),
            R.replace('?', '')
        )(initialMsgBody);                      
    }

    generateReplyBody(day, city) {
        return replyTemplates.weather.replace('{{day}}', day)
                                     .replace('{{city}}', city);
    }

    generateReply() {
        return {
            body: this.generateReplyBody(this.day, this.city),
            sendingTime: new Date (),
            sender: USER_BOT
        }
    }
}

module.exports = WeatherBot;