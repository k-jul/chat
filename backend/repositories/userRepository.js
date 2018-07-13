require('../db');
const Repository = require('./generalRepository');
const User = require('../db/schemas/users');

class UserRepository extends Repository {
    constructor() {
        super();
        this.model = User;
    }

    getByNickname(nickname) {
        return this.model.find({'nickname': nickname});
    }

}

module.exports = new UserRepository();