require('dotenv').config();
import express from 'express';
import config from 'config';
import connectToDb from './utils/connectToDb';
import log from './utils/logger';
import routes from './routes/index';
import deserializeUser from './middleware/deserializeUser';

const app = express();
app.use(express.json());
app.use(deserializeUser);

const PORT = config.get('port');

app.use(routes);


app.listen(PORT,()=>{
    log.info(`App started at http://localhost:${PORT}`);
    connectToDb();
})