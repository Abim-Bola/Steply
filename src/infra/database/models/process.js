import mongoose from "mongoose";

const processSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true
  },
}, { timestamps: true });

const Process = mongoose.model("Process", processSchema);
exports.Process = Process;
