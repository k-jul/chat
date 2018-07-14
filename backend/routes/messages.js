const router = require('express').Router();
const service = require('../services/messages');

router.get('/', (req, res, next) => {
    return service.getAll()
        .then((data) => res.status(200).send(data))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
});

router.get('/getNewMessages', (req, res) => {
    return service.getNewMessages(req.query.lastMsgDate)
        .then((data) => {
            return res.status(200).send(data)
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
});

router.post('/', (req, res) => {
    return service.createMessage(req.body)
    .then((data) => res.status(201).send(data))
    .catch((err) => {
        console.log(err);
        res.sendStatus(400);
    })
});


module.exports = router;