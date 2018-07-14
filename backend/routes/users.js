const router = require('express').Router();
const service = require('../services/users');

router.get('/', (req, res) => {
    return service.getAll()
        .then((data) => res.status(200).send(data))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
});

router.get('/:nickname', (req, res) => {

    return service.getUserByNickname(req.params.nickname)
        .then(data => res.send(data))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
});

router.post('/', (req, res) => {
    return service.createNewUser(req.body)
        .then((data) => res.status(201).send(data))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
});


module.exports = router;