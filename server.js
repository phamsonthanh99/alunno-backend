import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.json({ message: 'Hello world !' });
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running at http://localhost:${port}`);
});
