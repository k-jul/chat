const serviceUser = require('../services/users');
const serviceMessage = require('../services/messages');
module.exports.up = function (io) {
    io.on('connection', socket => {
        console.log('socket connected');

        socket.on('login', user => {
            serviceUser.getUserByNickname(user.nickname)
                .then(data => {
                    if (data.length) {
                        socket.emit('login:success', data[0]);
                        io.emit('user:entered', data[0])
                    } else {
                        serviceUser.createNewUser(user)
                            .then(user => {
                                socket.emit('login:success', user)
                                io.emit('user:entered', user)
                            });

                    }
                })
        })


        socket.on('get:initial:messages', () => {
            return serviceMessage.getAll()
                .then(messages => socket.emit('get:initial:messages:success', messages))
        })

        socket.on('get:initial:users', () => {
            return serviceUser.getAll()
                .then(users => socket.emit('get:initial:users:success', users))
        })

        socket.on('new:message', ([user, message]) => {
            serviceMessage.createMessage(message)
             .then(({_id, body, sendingTime}) => {
                 const message = {
                     _id,
                     body,
                     sendingTime,
                     sender: user
                 };
                 io.emit('new:message', message);
             })
                
        });


    })
};