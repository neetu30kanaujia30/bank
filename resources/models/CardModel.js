// Import Mongoose
import { Schema, model } from "mongoose";
const cardsSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "UserModel",
  },
  cardNumber: { type: String, required: true },
  cardType: {
    type: String,
    enum: ["DEBIT", "CREDIT", "OTHER"],
    required: true,
  },
  balance: { type: Number, default: 0 },
  expiryDate: { type: Date },
  cvv: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const CardsModel = model("cards", cardsSchema);
export default CardsModel;
