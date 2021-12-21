import mongoose from "mongoose";

const processSchema = new mongoose.Schema({
  attachment: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  process: {
    type: Schema.Types.ObjectId,
    ref: "process",
    required: true
  },
}, { timestamps: true });

const Process = mongoose.model("Process", processSchema);
exports.Process = Process;
