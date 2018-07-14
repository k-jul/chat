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

    update(id, body) {
        return this.model.findByIdAndUpdate(id, body, {new:true});
    }
}


module.exports = Repository;