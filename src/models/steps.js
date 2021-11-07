import mongoose from 'mongoose';
const processSchema = new mongoose.Schema({
    attachment:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    completed:{
      type: Boolean,
      required: true,
      default: false
    },
    processId:{
        type: Schema.Types.ObjectId,
        required: true
    },
}, { timestamps: true });


const Process = mongoose.model('Process', processSchema);
exports.Process = Process;
