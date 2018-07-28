const R = require('ramda');

const WeatherBot = require('./WeatherBot');
const MoneyExchangeBot = require('./MoneyExchangeBot');


class BotFabric {
  static makeBot(data) {
      switch (true) {
          case R.test(/weather/, data.body.toLowerCase()):
            const [day,city] = WeatherBot.findKeyWords(data.body);
            return new WeatherBot(day, city);
          case R.test(/convert/, data.body.toLowerCase()):
            const [, , sourceAmount, sourceCurrency, , targetCurrency] = MoneyExchangeBot.findKeyWords(data.body);
            return new MoneyExchangeBot(sourceAmount, sourceCurrency, targetCurrency);
          case R.test(/note/, data.body.toLowerCase()):
          case R.test(/quote/, data.body.toLowerCase()):
          default: 
            console.log('yuuhu!');
      }
  }
}

function initBot (initialMsg) {
        const Bot = BotFabric.makeBot(initialMsg);
        return Promise.resolve([initialMsg, Bot.generateReply()])
    }

module.exports = {
 initBot
}


