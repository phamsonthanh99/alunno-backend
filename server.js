import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routerManager from './app/routes';

const bcrypt = require('bcryptjs');
const db = require('./app/models');

const app = express();

const corsOptions = {
    origin: 'http://localhost:8081',
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

function initial() {
    db.Role.create({
        id: 1,
        name: 'user',
    });
    db.Role.create({
        id: 2,
        name: 'admin',
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
// production
db.sequelize.sync();
// development
// db.sequelize.sync({ force: true }).then(() => {
//     // eslint-disable-next-line no-console
//     console.log('Drop and re-sync db.');
//     initial();
// });

routerManager(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running at http://localhost:${port}`);
});
