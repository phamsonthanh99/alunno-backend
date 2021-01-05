import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const db = require('./app/models');

const app = express();

const corsOptions = {
    origin: 'http://localhost:8081',
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
db.sequelize.sync({ force: false }).then(() => {
    // eslint-disable-next-line no-console
    console.log('Drop and re-sync db.');
});

app.get('/', (req, res) => {
    res.json({ message: 'Hello world ! sfasd' });
});
require('./app/routes/tutorial.routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running at http://localhost:${port}`);
});
