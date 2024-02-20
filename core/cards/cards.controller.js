import cardsService from "./cards.service.js";
class cardsController {
  async reset(req, res, next) {
    /* 	#swagger.tags = ['DB']
                            #swagger.description = 'This routes is used for Reset DB' */
    /* #swagger.security = [{
               "AccessToken": []
        }] */
    return await cardsService.reset(req, res, next);
  }
  async seedDB(req, res, next) {
    /* 	#swagger.tags = ['DB']
                            #swagger.description = 'This routes is used for Seed DB' */
    /* #swagger.security = [{
               "AccessToken": []
        }] */
    return await cardsService.seedDB(req, res, next);
  }

  async getCardAmount(req, res, next) {
    /* 	#swagger.tags = ['Cards']
                            #swagger.description = 'This routes is used for get Amount by card_id' */
    /* #swagger.security = [{
               "AccessToken": []
        }] */
    return await cardsService.getCardAmount(req, res, next);
  }
  async fetchDataById(req, res, next) {
    /* 	#swagger.tags = ['Cards']
                            #swagger.description = 'This routes is used for get data by user Id' */
    /* #swagger.security = [{
               "AccessToken": []
        }] */
    return await cardsService.fetchDataById(req, res, next);
  }

  async transactionHistory(req, res, next) {
    /* 	#swagger.tags = ['Cards']
                            #swagger.description = 'This routes is used for get data by card Id' */
    /* #swagger.parameters['skip'] = {
    in: 'query',
    description: 'results skip',
    schema: {
        type: 'integer'
    }
} */
    /* #swagger.parameters['limit'] = {
    in: 'query',
    description: 'results limit',
    schema: {
        type: 'integer'
    }
} */
    /* #swagger.security = [{
               "AccessToken": []
        }] */
    return await cardsService.transactionHistory(req, res, next);
  }

  async transaction(req, res, next) {
    /* 	#swagger.tags = ['Cards']
                            #swagger.description = 'This routes is used for transaction' */
    /*#swagger.parameters['keyword'] = {
    in: 'body',
                                 type: 'object',
                                description: 'Review dummy -data  below that mention',
                                required: true,
                                schema: { $ref: "#/definitions/transaction" }
        }*/
    /* #swagger.security = [{
               "AccessToken": []
        }] */
    return await cardsService.transaction(req, res, next);
  }
}
export default new cardsController();
