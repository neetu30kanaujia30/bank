import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import CardModel from "../models/CardModel.js";
import UserModel from "../models/UserModel.js";
import config from "config";

const count = config.get("seederCount.cards") || 50;

const getRandomCardType = () => {
  const cardTypes = ["DEBIT", "CREDIT", "OTHER"];
  const randomIndex = Math.floor(Math.random() * cardTypes.length);
  return cardTypes[randomIndex];
};

const generateRandomAlphaNumeric = (length) => {
  const characters = "0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

const hashCVV = async (cvv) => {
  const saltRounds = 3;
  return bcrypt.hash(cvv, saltRounds);
};

const generateDummyCardData = async () => {
  const users = await UserModel.find({}, "_id");
  const userIds = users.map((user) => user._id);
  const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
  const cvv = generateRandomAlphaNumeric(3); // Assuming 3-digit CVV
  const hashedCVV = await hashCVV(cvv);

  return {
    user_id: randomUserId,
    cardNumber: generateRandomAlphaNumeric(16), // Assuming 16-digit card numbers
    cardType: getRandomCardType(),
    balance: faker.finance.amount(),
    expiryDate: faker.date.future(),
    cvv: hashedCVV, // Storing the hashed CVV
    isActive: true,
  };
};

const cardsSeeder = async () => {
  try {
    await CardModel.collection.drop();
    for (let i = 0; i < count; i++) {
      const randomCard = await generateDummyCardData();
      await CardModel.create(randomCard);
    }
    console.log("Card seeded successfully");
  } catch (error) {
    console.error("Error seeding Card:", error);
  }
};

export default cardsSeeder;
