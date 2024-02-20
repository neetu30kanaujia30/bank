import Router from "express";
const router = Router();

import userController from "./user.controller.js";

router.get("/user/all", userController.fetchUser);

export default router;
