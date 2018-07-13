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

    getByIds(ids) {
        return this.model.find({'_id': {$in: ids}});
    }
}

module.exports = new UserRepository();