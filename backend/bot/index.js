const R = require('ramda');

const WeatherBot = require('./WeatherBot');
const MoneyExchangeBot = require('./MoneyExchangeBot');
const AdviceBot = require('./AdviceBot');
const QuoteBot = require('./QuoteBot');
const NoteBot = require('./NoteBot');


class BotFabric {
    static makeBot(data) {
        switch (true) {
            case R.test(/weather/, data.body.toLowerCase()):
                const [day, city] = WeatherBot.findKeyWords(data.body);
                return new WeatherBot(day, city);

            case R.test(/convert/, data.body.toLowerCase()):
                const [, , sourceAmount, sourceCurrency, , targetCurrency] = MoneyExchangeBot.findKeyWords(data.body);
                return new MoneyExchangeBot(sourceAmount, sourceCurrency, targetCurrency);

            case R.test(/note/, data.body.toLowerCase()):
                const [action, title, body] = NoteBot.findKeyWords(data.body);
                return new NoteBot(action, title, body);

            case R.test(/.+\? .+/, data.body):
                return new AdviceBot();

            case R.test(/quote/, data.body.toLowerCase()):
                return new QuoteBot();

            default:
                console.log('yuuhu!');
        }
    }
}

async function initBot(initialMsg) {
    const Bot = BotFabric.makeBot(initialMsg);
    return Promise.resolve([initialMsg, await Bot.generateReply()])
}

module.exports = {
    initBot
}