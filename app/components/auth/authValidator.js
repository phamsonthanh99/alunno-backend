const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');

const Joi = BaseJoi.extend(Extension);

const createUser = Joi.object().keys({
    fullName: Joi.string().max(255).required(),
    phone: Joi.string().max(255).allow(null).allow(''),
    age: Joi.string().max(255).allow(null).allow(''),
    address: Joi.string().max(255).allow(null).allow(''),
    username: Joi.string().max(255).required(),
    email: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
    roles: Joi.array().items(Joi.string()).required(),
});
const signinUser = Joi.object().keys({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
});
export async function createUserValidator(req, res, next) {
    const { body } = req;
    const result = createUser.validate(body);
    if (result.error) {
        res.json(result.error.details);
        return;
    }
    next();
}
export async function signinValidator(req, res, next) {
    const { body } = req;
    const result = signinUser.validate(body);
    if (result.error) {
        res.json(result.error.details);
        return;
    }
    next();
}
