// import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);
exports.Category = Category;
