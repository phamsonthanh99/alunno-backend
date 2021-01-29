const db = require('../models');

export async function seederStudent() {
    db.Student.create({
        studentId: '17020000',
        fullName: 'Temp name',
        phone: '0978123778',
        age: '20',
        address: '144 Xuan Thuy',
        email: 'tempname1@gmail.com',
        gender: 'other',
        classId: 1,
    });
    db.Student.create({
        studentId: '17020001',
        fullName: 'Temp name',
        phone: '0978123778',
        age: '20',
        address: '144 Xuan Thuy',
        email: 'tempname2@gmail.com',
        gender: 'other',
        classId: 2,
    });
    db.Student.create({
        studentId: '17020002',
        fullName: 'Temp name',
        phone: '0978123778',
        age: '20',
        address: '144 Xuan Thuy',
        email: 'tempname3@gmail.com',
        gender: 'other',
        classId: 3,
    });
}
