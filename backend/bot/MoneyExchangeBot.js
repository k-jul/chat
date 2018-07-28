const R = require('ramda');

const {USER_BOT, replyTemplates, currencyRates}  = require('./config.js');

class MoneyExchangeBot {

    constructor (amount, sourceCurrency, targetCurrency) {
        this.amount = amount;
        this.sourceCurrency = sourceCurrency.replace('s', '');
        this.targetCurrency = targetCurrency.replace('s', '');
        this.generateReplyBody = this.generateReplyBody.bind(this);
        this.generateReply = this.generateReply.bind(this);
    }

    static findKeyWords (initialMsgBody) {
        return initialMsgBody.split(' ');                 
    }

    generateReplyBody(amount, sourceCurrency, targetCurrency) {
        const targetAmount = amount * currencyRates[`${sourceCurrency}__${targetCurrency}`];
        return replyTemplates.moneyExchange.replace('{{sourceAmount}}', amount)
                                            .replace('{{sourceCurrency}}', sourceCurrency)
                                            .replace('{{targetCurrency}}', this.targetCurrency)
                                            .replace('{{targetAmount}}', targetAmount)
    }

    generateReply() {
        return {
            body: this.generateReplyBody(this.amount, this.sourceCurrency, this.targetCurrency),
            sendingTime: new Date (),
            sender: USER_BOT
        }
    }
}

module.exports = MoneyExchangeBot;