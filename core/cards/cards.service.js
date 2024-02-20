import Response from "../../response/response.js";
import config from "config";
import Logger from "../../resources/logs/logger.log.js";
import UserModel from "../../resources/models/UserModel.js";
import CardModel from "../../resources/models/CardModel.js";
import TransactionModel from "../../resources/models/TransactionModel.js";
import cardsValidate from "./cards.validate.js";
import mongoose from "mongoose";
import { buildQuery } from "../../core/helper/function.js";
import userSeeder from "../../resources/seeders/user.js";
import cardsSeeder from "../../resources/seeders/cards.js";
import transactionSeeder from "../../resources/seeders/transaction.js";
class CardsService {
  async reset(req, res) {
    try {
      await CardModel.deleteMany({});
      await UserModel.deleteMany({});
      await CardModel.deleteMany({});
      await TransactionModel.deleteMany({});
      return res.send(Response.ticketSuccessSeedReset("Reset successful Done"));
    } catch (error) {
      console.log(`Error in catch ${error}`);
      Logger.error(`UnExpected Error in Reset`, error?.message);
      res
        .status(400)
        .send(Response.failResp(`UnExpected Error`, error?.message));
    }
  }
  async seedDB(req, res) {
    try {
      await userSeeder();
      await cardsSeeder();
      await transactionSeeder();
      return res.send(Response.ticketSuccessSeedReset("Seed successful Done"));
    } catch (error) {
      console.log(`Error in catch ${error}`);
      Logger.error(`UnExpected Error in Seed`, error?.message);
      res
        .status(400)
        .send(Response.failResp(`UnExpected Error`, error?.message));
    }
  }

  async transaction(req, res) {
    const { error } = cardsValidate.transaction(req.body);
    if (error) {
      return res
        .status(400)
        .send(Response.validationFailResp("Validation Fail", error.message));
    }
    try {
      const { amount, type, card_id } = req.body;
      const card = await CardModel.findById({ _id: card_id });
      if (!card) {
        return res
          .status(404)
          .send(
            Response.failResp(
              "Card not found",
              "The specified card does not exist.",
            ),
          );
      }
      if (type === "debit") {
        if (card.balance < amount) {
          return res
            .status(400)
            .send(
              Response.failResp(
                "Insufficient balance",
                "The card does not have sufficient balance for this transaction.",
              ),
            );
        }
        await CardModel.updateOne(
          { _id: card_id },
          { $inc: { balance: -amount } },
        );
      } else if (type === "credit") {
        await CardModel.updateOne(
          { _id: card_id },
          { $inc: { balance: amount } },
        );
      } else {
        return res
          .status(400)
          .send(
            Response.failResp(
              "Invalid transaction type",
              "Transaction type must be either 'credit' or 'debit'.",
            ),
          );
      }
      await TransactionModel.create(req.body);
      return res.status(200).send({
        status: "success",
        message: "Transaction successfully ",
      });
    } catch (error) {
      console.log(`Error in catch ${error}`);
      Logger.error(`UnExpected Error in fetchDataByStatus`, error?.message);
      res
        .status(400)
        .send(Response.failResp(`UnExpected Error`, error?.message));
    }
  }

  async transactionHistory(req, res) {
    let limit = Number(req.query.limit) || 50;
    let page = Number(req.query.page) || 1;
    let skip = (page - 1) * limit;
    const { error } = cardsValidate.viewId({ id: req.params.id });
    if (error) {
      return res
        .status(400)
        .send(Response.validationFailResp("Validation Fail", error.message));
    }

    try {
      const card_id = new mongoose.Types.ObjectId(req.params.id);
      const query = await buildQuery({ skip, limit, card_id });

      const [results, totalCount] = await Promise.all([
        TransactionModel.find({ card_id })
          .skip(skip)
          .limit(limit)
          .sort({ timestamp: -1 }),
        TransactionModel.countDocuments(),
      ]);
      let prod = config.get("prod") || false;
      let currentPage = page;
      let totalPages = Math.ceil(totalCount / limit);
      let firstPageURL = `${prod ? "https" : "http"}://${config.get("user.host_url")}/v1/transactions-history/${card_id}?page=1&limit=${limit}`;
      let from = skip + 1;
      let to = Math.min(skip + limit, totalCount);
      let nextPageURL =
        page < totalPages
          ? `${prod ? "https" : "http"}://${config.get("user.host_url")}/v1/transactions-history/${card_id}?page=${page + 1}&limit=${limit}`
          : null;
      let prevPageURL =
        page > 1
          ? `${prod ? "https" : "http"}://${config.get("user.host_url")}/v1/transactions-history/${card_id}?page=${page - 1}&limit=${limit}`
          : null;
      let path = `${prod ? "https" : "http"}://${config.get("user.host_url")}/v1/transactions-history/${card_id}`;
      let perPage = limit;
      return res.status(200).send(
        Response.successListAllResp("fetch successfully", {
          page: currentPage,
          limit: limit,
          current_page: currentPage,
          first_page_url: firstPageURL,
          from: from,
          next_page_url: nextPageURL,
          path: path,
          per_page: perPage,
          prev_page_url: prevPageURL,
          to: to,
          totalCount,
          bookingSeatCount: [],
          data: results,
        }),
      );
    } catch (error) {
      Logger.error(`Unexpected Error in getAllTickets`, error?.message);
      return res
        .status(400)
        .send(Response.failResp(`Unexpected Error`, error?.message));
    }
  }

  async getCardAmount(req, res) {
    try {
      const { error } = cardsValidate.viewId({ id: req.params.id });
      if (error) {
        return res
          .status(400)
          .send(Response.validationFailResp("Validation Fail", error.message));
      }
      const _id = new mongoose.Types.ObjectId(req.params.id);
      const data = await CardModel.find({ _id });
      console.log(data[0]);
      if (!data || data.length === 0) {
        return res
          .status(200)
          .send(
            Response.cardSuccessGetAmountResp(
              "No data found for the provided status.",
              data[0].balance,
            ),
          );
      }
      return res
        .status(200)
        .send(
          Response.cardSuccessGetAmountResp(
            "fetch successfully",
            data[0].balance,
          ),
        );
    } catch (error) {
      console.log(`Error in catch ${error}`);
      Logger.error(`UnExpected Error in fetchDataByStatus`, error?.message);
      res
        .status(400)
        .send(Response.failResp(`UnExpected Error`, error?.message));
    }
  }
  async fetchDataById(req, res) {
    try {
      const { error } = cardsValidate.viewId({ id: req.params.id });
      if (error) {
        return res
          .status(400)
          .send(Response.validationFailResp("Validation Fail", error.message));
      }
      const user_id = new mongoose.Types.ObjectId(req.params.id);
      const userDetail = await UserModel.find({ _id: user_id });

      const data = await CardModel.find({ user_id });
      if (!data || data.length === 0) {
        return res
          .status(200)
          .send(
            Response.cardSuccessGetDataByStatusResp(
              "No data found for the provided status.",
              user_id,
              data,
            ),
          );
      }
      return res
        .status(200)
        .send(
          Response.cardSuccessGetDataByStatusResp(
            "fetch successfully by status",
            userDetail,
            data,
          ),
        );
    } catch (error) {
      console.log(`Error in catch ${error}`);
      Logger.error(`UnExpected Error in fetchDataByStatus`, error?.message);
      res
        .status(400)
        .send(Response.failResp(`UnExpected Error`, error?.message));
    }
  }
}
export default new CardsService();
