import {
    logSystemError,
} from '../../helpers/messageResponse';
import { fetchTutorialList } from './tutorialService';

const excel = require('exceljs');
const moment = require('moment-timezone');

export async function dowload(req, res) {
    try {
        const rawData = req.query;
        const objs = await fetchTutorialList(rawData);
        const tutorials = [];
        objs.forEach((obj) => {
            tutorials.push({
                id: obj.id,
                title: obj.title,
                description: obj.description,
            });
        });
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Tutorials');
        worksheet.columns = [
            { header: 'Id', key: 'id', width: 5 },
            { header: 'Title', key: 'title', width: 25 },
            { header: 'Description', key: 'description', width: 25 },
        ];
        // Add array rows
        worksheet.addRows(tutorials);
        const fileName = `tutorials_${moment()
            .tz('Asia/Asia/Ho_Chi_Minh')
            .format('YYYY_MM_DD_HH_mm_ss')}`;
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
        res.setHeader(
            'Content-Disposition',
            // eslint-disable-next-line no-useless-concat
            `attachment; filename=${fileName}.xlsx`,
        );
        return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });
    } catch (error) {
        return logSystemError(res, error, 'excelController - dowload');
    }
}
