// import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        required: true
    },
}, { timestamps: true });


const Category = mongoose.model('Category', categorySchema);
exports.Category = Category;
