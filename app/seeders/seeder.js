const bcrypt = require('bcryptjs');
const db = require('../models');

export function initial() {
    db.Role.create({
        id: 1,
        name: 'teacher',
    });
    db.Role.create({
        id: 2,
        name: 'admin',
    });
    db.Role.create({
        id: 3,
        name: 'school_manager',
    });
    db.User.create({
        fullName: 'Admin full name',
        phone: '0967612173',
        age: 20,
        address: 'vinahud',
        username: 'admin',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('admin@1234', 8),
    }).then((user) => {
        db.Role.findByPk(2).then((role) => {
            user.addRoles(role);
            user.save();
        });
    });
}
