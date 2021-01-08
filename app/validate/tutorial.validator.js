const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');

const Joi = BaseJoi.extend(Extension);

const validSchema = Joi.object().keys({
    title: Joi.string().max(255).required(),
    description: Joi.string().max(255).allow('').allow(null),
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
