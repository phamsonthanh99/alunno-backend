const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');

const Joi = BaseJoi.extend(Extension);

const validSchema = Joi.object().keys({
    username: Joi.string().max(255).required(),
    email: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
});
const validQuery = Joi.object().keys({
    limit: Joi.number().integer().min(1).allow(null),
    page: Joi.number().integer().allow(null),
    keyword: Joi.string().max(255).allow(null),
});
export async function createValidator(req, res, next) {
    const { body } = req;
    const result = validSchema.validate(body);
    if (result.error) {
        res.json(result.error.details);
        return;
    }
    next();
}
export async function updateValidator(req, res, next) {
    const { body } = req;
    const result = validSchema.validate(body);
    if (result.error) {
        res.json(result.error.details);
        return;
    }
    next();
}
export async function getListValidator(req, res, next) {
    const { param } = req.query;
    const result = validQuery.validate(param);
    if (result.error) {
        res.json(result.error.details);
        return;
    }
    next();
}
