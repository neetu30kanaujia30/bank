import Joi from "joi";
class cardsValidate {
  viewId(body) {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    const result = schema.validate(body);
    console.log(result);
    return result;
  }
  transaction(body) {
    const schema = Joi.object({
      amount: Joi.number().required().min(1).max(100000).messages({
        "number.base": "Amount must be a number",
        "any.required": "Amount is required",
        "number.empty": "Amount cannot be empty",
        "number.min": "Amount must be greater than 0",
        "number.max": "Amount must be less than 1 lakh",
      }),
      description: Joi.string().required(),
      type: Joi.string().valid("credit", "debit").required(),
      card_id: Joi.string().required(),
    });
    const result = schema.validate(body);
    console.log(result);
    return result;
  }
}
export default new cardsValidate();
