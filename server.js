import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routerManager from './app/routes';

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
