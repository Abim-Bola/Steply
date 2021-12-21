import mongoose from "mongoose";

class BaseRepository {
    constructor({ Model }) {
        console.log('>>>>> model', Model);
        this.Collection = Model

    }
    isValidId(documentId) {
        return mongoose.Types.ObjectId.isValid(documentId);
    }

    async create(body) {
        const result = new this.Collection(body)
        return result.save();
    }

    async find(query = {}, projection, options = {}, multiple = false ) {
        const result = await multiple ? this.Collection.find(query, projection, options) : this.Collection.findOne(query);
        if (!result) {
            throw new ResourceNotFoundError("Resource not found");
        }
        return result;
    }

    async findById(documentId) {
        if (!this.isValidId(documentId)) {
            throw new InvalidPayloadError(`Invalid ${this.Collection}Id`);
        }
    }

    async findByIdAndUpdate(documentId, query = {}) {
        if (query._id && !this.isValidId(query._id)) {
            throw new InvalidPayloadError(`Invalid ${this.Collection}Id`);
        }
    }
    async findOneAndDelete() {

    }
    async update() {

    }
}

export default BaseRepository;