// Import Mongoose
import { Schema, model } from "mongoose";
const transactionSchema = new Schema({
  card_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "CardModel",
  },
  amount: { type: Number, required: true },
  description: { type: String },
  type: { type: String, enum: ["credit", "debit"], required: true },
  timestamp: { type: Date, default: Date.now },
});
const TransactionModel = model("transaction", transactionSchema);
export default TransactionModel;
