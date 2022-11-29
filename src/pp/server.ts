import express from 'express';
import { UserRouter } from '../user/user.router';

const app = express();

app.use('/api', new UserRouter().router);

app.listen(3000);
