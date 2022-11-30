import { ServerBoostrap } from './server/server';

const app = new ServerBoostrap();
app.dbConnect();
app.listen();