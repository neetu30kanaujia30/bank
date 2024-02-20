import Router from "express";
const router = Router();

import cardsController from "./cards.controller.js";

//Additional API for admin to reset the server.
router.get("/reset", cardsController.reset);
//Additional API for admin to reset the server.
router.get("/seed-db", cardsController.seedDB);
//Fetch card detail by user_id
router.get("/cards/:id", cardsController.fetchDataById);
//Fetch card amount by card_id
router.get("/cards/amount/:id", cardsController.getCardAmount);
//Perform Transaction credit/debit
router.put("/cards/transactions", cardsController.transaction);
//Fetch transaction history by card id
router.get(
  "/cards/transactions-history/:id",
  cardsController.transactionHistory,
);

export default router;
