const serviceUser = require('../services/users');
const serviceMessage = require('../services/messages');
module.exports.up = function (io) {
    io.on('connection', socket => {
        console.log('socket connected');
        socket.emit('connection:success', {});

        let currentUser = {};

        socket.on('login', user => {
            serviceUser.getUserByNickname(user.nickname)
                .then(data => {
                    if (data.length) {
                        currentUser = data[0];
                        socket.emit('login:success', data[0]);
                        io.emit('user:entered', data[0]);
                        serviceUser.updateUserInfo(data[0]._id, {'status':'just_appeared'})
                        .then (user => {
                            io.emit('user:change:status', user);
                            setTimeout(() => {
                                if (user.status === "just_appeared") {serviceUser.updateUserInfo(user._id, {'status':'online'})
                                        .then(user => io.emit('user:change:status', user))  
                                    } else return;   
                            }, 60*1000)
                        })
                    
                    } else {
                        serviceUser.createNewUser(user)
                            .then(user => {
                                currentUser = user;
                                socket.emit('login:success', user)
                                io.emit('user:entered', user)
                                serviceUser.updateUserInfo(user._id, {'status':'just_appeared'})
                                .then (user => {
                                    io.emit('user:change:status', user);
                                    setTimeout(() => {
                                        if (user.status === "just_appeared") {serviceUser.updateUserInfo(user._id, {'status':'online'})
                                        .then(user => io.emit('user:change:status', user))  
                                    } else return; 
                                    }, 60*1000)
                                })
                                
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

            serviceMessage.newMessage(message)
             .then(([userMsg, botReply]) => {
                 const message = {
                     _id: userMsg._id || '1',
                     body: userMsg.body,
                     sendingTime: userMsg.sendingTime,
                     sender: user
                 };
                 io.emit('new:message', message);
                 if (botReply) io.emit('new:message', botReply);
             })
                
        });

        socket.on('user:typing', (typingUser) => {
            io.emit('user:typing', typingUser);
        })

        socket.on('user:stopped:typing', (userStoppedTyping) => {
            io.emit('user:stopped:typing', userStoppedTyping);
        });

        socket.on('disconnect', socket => {
            if(currentUser._id) {
                serviceUser.updateUserInfo(currentUser._id, {'status':'just_left'})
                .then (user => {
                    io.emit('user:stopped:typing', user);
                    io.emit('user:left', user);
                    io.emit('user:change:status', user);
                    setTimeout(() => {
                        if (user.status === 'just_left') {
                        serviceUser.updateUserInfo(user._id, {'status':'offline'})
                            .then(user => io.emit('user:change:status', user)) 
                        } else return;  
                    }, 60*1000)
                })
            }
        })
    })
};