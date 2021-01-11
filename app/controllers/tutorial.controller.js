import {
    createNewTutorial,
    fetchTutorialList,
    getTutorialDetail,
    updateTutorial,
    deleteTutorialById,
} from '../service/tutorial.service';

import {
    respondSuccess,
    respondWithError,
    logSystemError,
} from '../helpers/messageResponse';
import { checkIfValueExist } from '../helpers/commonFunctions';
import db from '../models';

export async function createTutorial(req, res) {
    try {
        const rawData = req.body;
        const isTitleExist = await checkIfValueExist(
            db.Tutorial,
            rawData.title,
            'title',
        );
        if (isTitleExist) {
            return res.json(respondWithError(407, 'Title exist'));
        }
        const tutorial = await createNewTutorial(rawData);
        return res.json(respondSuccess(tutorial));
    } catch (error) {
        return logSystemError(
            res,
            error,
            'tutorialController - createTutorial',
        );
    }
}

export async function findAllTutorial(req, res) {
    try {
        const rawData = req.query;
        const tutorial = await fetchTutorialList(rawData);
        return res.json(
            respondSuccess({
                items: tutorial.rows,
                totalItems: tutorial.count,
            }),
        );
    } catch (error) {
        return logSystemError(
            res,
            error,
            'tutorialController - findAllTutorial',
        );
    }
}

export async function findOneTutorial(req, res) {
    try {
        const { id } = req.params;
        const tutorial = await getTutorialDetail(id);
        if (!tutorial) {
            return res.json(respondWithError(407, 'Title does not exits'));
        }
        return res.json(respondSuccess(tutorial));
    } catch (error) {
        return logSystemError(
            res,
            error,
            'tutorialController - findOneTutorial',
        );
    }
}

export async function update(req, res) {
    try {
        const { id } = req.params;
        const isIdExist = await checkIfValueExist(db.Tutorial, id);
        if (!isIdExist) {
            return res.json(respondWithError(407, 'Title does not exits'));
        }
        const rawData = req.body;
        const isTitleExist = await checkIfValueExist(
            db.Tutorial,
            rawData.title,
            'title',
            { excludeField: 'id', excludeValues: [id] },
        );
        if (isTitleExist) {
            return res.json(respondWithError(407, 'Title exist'));
        }
        await updateTutorial(id, rawData);
        const tutorial = await getTutorialDetail(id);
        return res.json(respondSuccess(tutorial, 'Update success'));
    } catch (error) {
        return logSystemError(res, error, 'tutorialController - update');
    }
}

export async function deleteTutorial(req, res) {
    try {
        const { id } = req.params;
        const isIdExist = await checkIfValueExist(db.Tutorial, id);
        if (!isIdExist) {
            return res.json(respondWithError(407, 'Title does not exits'));
        }
        await deleteTutorialById(id);
        return res.json(respondSuccess(id));
    } catch (error) {
        return logSystemError(
            res,
            error,
            'tutorialController - deleteTutorial',
        );
    }
}
