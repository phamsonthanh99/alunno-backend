import { Op } from 'sequelize';
import { logger } from './logger';

export async function checkIfValueExist(model, value, field = 'id', params = {}) {
    try {
        if (value === undefined) throw new Error('Search value in checkIfValueExist function cannot be undefined');
        const {
            excludeField = null, excludeValues = [], attributes = ['id'], paranoid = false, // Take solf-deleted items
        } = params;
        const whereValue = excludeField
            ? { [field]: value, [excludeField]: { [Op.notIn]: excludeValues } }
            : { [field]: value };
        return await model.findOne({ attributes, where: whereValue, paranoid });
    } catch (e) {
        logger.error(`----> Error in checkIfValueExist ${e.message}`);
        throw e;
    }
}
