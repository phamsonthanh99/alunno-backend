const bcrypt = require('bcryptjs');
const db = require('../models');

export async function seederUser() {
    db.User.create({
        fullName: 'Admin full name',
        phone: '0967612173',
        age: 20,
        address: 'vinahud',
        username: 'admin',
        email: 'admin@sm.com',
        password: bcrypt.hashSync('athanh123', 8),
    }).then((user) => {
        db.Role.findByPk(1).then((role) => {
            user.addRoles(role);
            user.save();
        });
    });
    db.User.create({
        fullName: 'SM full name',
        phone: '0967612173',
        age: 20,
        address: 'vinahud',
        username: 'schoolmanager',
        email: 'schoolmanager@sm.com',
        password: bcrypt.hashSync('athanh123', 8),
    }).then((user) => {
        db.Role.findByPk(2).then((role) => {
            user.addRoles(role);
            user.save();
        });
    });
    db.User.create({
        fullName: 'Teacher full name',
        phone: '0967612173',
        age: 20,
        address: 'vinahud',
        username: 'teacher',
        email: 'teacher@sm.com',
        password: bcrypt.hashSync('athanh123', 8),
    }).then((user) => {
        db.Role.findByPk(3).then((role) => {
            user.addRoles(role);
            user.save();
        });
    });
}
