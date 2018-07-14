class Repository {
    constructor() {
        this.model = null;
    }

    getAll() {
        return this.model.find();
    }
    
    create(data) {
        return new this.model(data).save();
    }
}


module.exports = Repository;