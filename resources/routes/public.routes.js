import cards from "../../core/cards/cards.routes.js";
import user from "../../core/user/user.routes.js";
import token from "../../core/token/token.routes.js";
import verifyToken from "../../middleware/verifyToken.js";
import cors from "cors";
class Routes {
  constructor(app) {
    this.configureCors(app);
    app.options("*", cors()); // include before other routes
    app.use("/v1", token);
    app.use(verifyToken);
    app.use("/v1", user);
    app.use("/v1", cards);
  }
  configureCors(app) {
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST, PUT, DELETE, GET");
      res.setHeader("Cache-Control", "no-cache");
      next();
    });
  }
}
export default Routes;
