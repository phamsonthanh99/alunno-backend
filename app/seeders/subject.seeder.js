const db = require('../models');

export async function seederSubject() {
    db.Subject.create({
        name: 'Image Processing',
        status: 'inactive',
        userId: 4,
        description: 'description',
    });
    db.Subject.create({
        name: 'Software testing and Quality assuarance',
        status: 'inactive',
        userId: 4,
        description: 'description',
    });
    db.Subject.create({
        name: 'Machine Learning',
        status: 'inactive',
        userId: 4,
        description: 'description',
    });
}
