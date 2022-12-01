import { ServerBoostrap } from './server/server';

const app = new ServerBoostrap();
app.dbConnect().then(() => app.synchronizeDB());
app.listen();
