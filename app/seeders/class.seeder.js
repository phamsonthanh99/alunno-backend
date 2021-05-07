const db = require('../models');

export async function seederClass() {
    db.Class.create({
        name: 'CA',
        description: 'description',
    });
    db.Class.create({
        name: 'CH',
        description: 'description',
    });
    db.Class.create({
        name: 'CK',
        description: 'description',
    });
}
