import { Op } from 'sequelize';
import { logger } from './logger';
import { getUserDetail } from '../components/user/userService';
import { SendEmail } from './constants';
import { templateTeacherAssignedManageSubject } from './templateSendEmail';

require('dotenv').config();
const nodeMailer = require('nodemailer');

export async function checkIfValueExist(
    model,
    value,
    field = 'id',
    params = {},
) {
    try {
        if (value === undefined) {
            throw new Error(
                'Search value in checkIfValueExist function cannot be undefined',
            );
        }
        const {
            excludeField = null,
            excludeValues = [],
            attributes = ['id'],
            paranoid = false, // Take solf-deleted items
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

export async function sendEmail(mailData) {
    const adminEmail = process.env.EMAIL_ADMIN;
    const adminPassword = process.env.PASSWORD_EMAIL;

    const mailHost = process.env.MAIL_HOST;
    const mailPost = 587;

    const transporter = nodeMailer.createTransport({
        host: mailHost,
        port: mailPost,
        secure: false,
        auth: {
            user: adminEmail,
            pass: adminPassword,
        },
    });

    const manager = await getUserDetail(mailData.managerId);
    const teacher = await getUserDetail(mailData.receiverId);

    const template = templateTeacherAssignedManageSubject(mailData.subjectName, manager.fullName, mailData.content);
    const options = {
        from: adminEmail,
        to: teacher.email,
        subject: mailData.title,
        html: template,
    };
    if (process.env.IS_SEND_EMAIL === SendEmail.SEND_EMAIL) {
        return transporter.sendMail(options);
    }
    return 'Email not sent';
}
