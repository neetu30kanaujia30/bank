import { faker } from "@faker-js/faker";
import TransactionModel from "../models/TransactionModel.js";
import CardModel from "../models/CardModel.js";
import UserModel from "../models/UserModel.js";
import config from "config";

const count = config.get("seederCount.transactions") || 60;

const getRandomType = () => {
  const types = ["credit", "debit"];
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
};

const generateDummyTransactionData = async () => {
  const users = await UserModel.find({}, "_id");
  const userIds = users.map((user) => user._id);
  const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];

  const cards = await CardModel.find({}, "_id");
  const cardIds = cards.map((card) => card._id);
  const randomCardId = cardIds[Math.floor(Math.random() * cardIds.length)];

  return {
    card_id: randomCardId,
    amount: faker.finance.amount(),
    description: faker.lorem.sentence(),
    type: getRandomType(),
    timestamp: faker.date.recent(),
  };
};

const transactionSeeder = async () => {
  try {
    await TransactionModel.collection.drop();
    for (let i = 0; i < count; i++) {
      const randomTransaction = await generateDummyTransactionData();
      await TransactionModel.create(randomTransaction);
    }
    console.log("Transactions seeded successfully");
  } catch (error) {
    console.error("Error seeding Transactions:", error);
  }
};

export default transactionSeeder;
