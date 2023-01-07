import express from 'express';
import bodyParser from 'body-parser';
import router from './router';

const app = express();

const port = process.env.PORT || 3600;

app.use(bodyParser.json());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server starting on ${port}`);
});
