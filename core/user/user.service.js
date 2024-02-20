import Response from "../../response/response.js";
import Logger from "../../resources/logs/logger.log.js";
import UserModel from "../../resources/models/UserModel.js";
import userValidate from "./user.validate.js";
import mongoose from "mongoose";
import { buildQuery } from "../helper/function.js";

class userService {
  async fetchUser(req, res) {
    try {
      const data = await UserModel.find({});
      if (!data || data.length === 0) {
        return res
          .status(200)
          .send(
            Response.userSuccessGetDataStatusResp(
              "No data found for the provided status.",
              data,
            ),
          );
      }
      return res
        .status(200)
        .send(
          Response.userSuccessGetDataStatusResp(
            "fetch successfully by status",
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
export default new userService();
