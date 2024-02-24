import { model, Schema } from "mongoose"
import { ICategory } from "../../types/category"
const categorySchema: Schema = new Schema({
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

export default model<ICategory>("Category", categorySchema)
