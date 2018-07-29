const USER_BOT = {
    _id:"5b5c61e53b84d133a71cdf4c",
    name:"@bot",
    nickname:"@bot",
    status:"online"
};

const replyTemplates = {
    weather: 'The weather is fine in {{city}} {{day}}, temperature -5C',
    moneyExchange: '{{sourceAmount}} {{sourceCurrency}} = {{targetAmount}} {{targetCurrency}}',
    advice: ['Начни с отдыха', 'Не принимай близко к сердцу', 'А вот здесь стоит обратиться к специалисту', 'Не парься, это ерунда', 'Выдохни и подумай над этим сам', 'Тебе нужна помощь друга', 'Просто соберись', 'Съешь вкусняшку', 'Выспись', 'Забудь об этом'],
    quote: ['"Success is not final; failure is not fatal: It is the courage to continue that counts."-- Winston S. Churchill', '"It is better to fail in originality than to succeed in imitation."-- Herman Melville', '"Success usually comes to those who are too busy to be looking for it."-- Henry David Thoreau', '"I find that the harder I work, the more luck I seem to have."-- Thomas Jefferson', '"Stop chasing the money and start chasing the passion."-- Tony Hsieh', 'Те "If you are not willing to risk the usual, you will have to settle for the ordinary."- Jim Rohn', '"All progress takes place outside the comfort zone."-- Michael John Bobak', ' "The only limit to our realization of tomorrow will be our doubts of today."-- Franklin D. Roosevelt', '"The way to get started is to quit talking and begin doing."-- Walt Disney', '"If you really want to do something, you\'ll find a way. If you don\'t, you\'ll find an excuse."-- Jim Rohn'],
    notes: {
        saved: "<span style='color:green'> Thank you! Your note <b>\"{{title}}\"</b> was successfully saved!</span>",
        deleted: "<span style='color:#cc8316'>Thank you! Your note <b>\"{{title}}\"</b> was successfully deleted!</span>"
    }
}

const currencyRates = {
    dollar__euro: 0.86,
    euro__dollar: 1.17,
    dollar__hryvnia: 26.78,
    hryvnia__dollar: 0.037,
    hryvnia__euro: 0.032,
    euro__hryvnia: 31.26,
}


module.exports = {
    USER_BOT,
    replyTemplates,
    currencyRates
}
