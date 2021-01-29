const db = require('../models');

export async function seederRole() {
    db.Role.create({
        id: 1,
        name: 'admin',
    });
    db.Role.create({
        id: 2,
        name: 'school_manager',
    });
    db.Role.create({
        id: 3,
        name: 'teacher',
    });
}
