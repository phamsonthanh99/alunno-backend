import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 1999;

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.json({ message: 'Hello world' });
    res.json({ message: 'Hello world' });
    res.json({ message: 'Hello world' });
    res.json({ message: 'Hello world' });
    res.json({ message: 'Hello world' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
