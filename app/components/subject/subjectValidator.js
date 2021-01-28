const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');

const Joi = BaseJoi.extend(Extension);

const validSchema = Joi.object().keys({
    name: Joi.string().max(255).required(),
    status: Joi.string().valid('inactive', 'active', 'done'),
    description: Joi.string().max(255).allow('').allow(null),
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
