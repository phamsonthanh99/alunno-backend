const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');

const Joi = BaseJoi.extend(Extension);

const validQuery = Joi.object().keys({
    limit: Joi.number().integer().min(1).allow(null),
    page: Joi.number().integer().allow(null),
    keyword: Joi.string().max(255).allow(null),
});

export async function getListValidator(req, res, next) {
    const { param } = req.query;
    const result = validQuery.validate(param);
    if (result.error) {
        res.json(result.error.details);
        return;
    }
    next();
}

const validSchema = Joi.object().keys({
    studentId: Joi.string().max(8).allow(null).allow(''),
    fullName: Joi.string().max(255).allow(null).allow(''),
    phone: Joi.string().max(255).allow(null).allow(''),
    age: Joi.string().max(255).allow(null).allow(''),
    address: Joi.string().max(255).allow(null).allow(''),
    email: Joi.string().max(255).allow(null).allow(''),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    classId: Joi.number().integer().required(),
    // subjectId: Joi.number().integer().optional(),
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
