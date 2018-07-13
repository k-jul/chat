class Repository {
    constructor() {
        this.model = null;
    }

    getAll() {
        return this.model.find();
    }

    getById(id) {
        return this.model.findById(id);
    }

    create(data) {
        return new this.model(data).save();
    }

    update(id, body) {
        return this.model.findByIdAndUpdate(id, body, {new:true});
    }

    delete(id) {
        return this.model.remove({_id: id});
    }
}


module.exports = Repository;