const USER_BOT = {
    _id:"5b5c61e53b84d133a71cdf4c",
    name:"@bot",
    nickname:"@bot",
    status:"online"
};

const replyTemplates = {
    weather: 'The weather is fine in {{city}} {{day}}, temperature -5C',
    moneyExchange: '{{sourceAmount}} {{sourceCurrency}} = {{targetAmount}} {{targetCurrency}}'
}

const currencyRates = {
    dollar__euro: 0.9,
    euro__dollar: 1.1,
    dollar__hryvnia: 26,
    hryvnia__dollar: 0.38,
    hryvnia__euro: 30,
    euro__hryvnia: 0.33,
}


module.exports = {
    USER_BOT,
    replyTemplates,
    currencyRates
}
