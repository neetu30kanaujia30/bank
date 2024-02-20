import userService from "./user.service.js";
class userController {
  async fetchUser(req, res, next) {
    /* 	#swagger.tags = ['User']
                            #swagger.description = 'This routes is used for get all users' */
    /* #swagger.security = [{
               "AccessToken": []
        }] */
    return await userService.fetchUser(req, res, next);
  }
}
export default new userController();
