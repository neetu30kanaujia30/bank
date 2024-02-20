// Import Mongoose
import { Schema, model } from "mongoose";
const reviewSchema = new Schema({
  review: {
    type: String,
    required: true,
  },
});
const reviewModel = model("review", reviewSchema);
export default reviewModel;
