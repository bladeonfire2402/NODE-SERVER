import Joi from "joi";

const productValidator= Joi.object({
    name:Joi.string().required().min(10).max(255),
    price:Joi.number().required().min(1000),
    desc:Joi.string().required(),
})

export default productValidator