import { ServerBootstrap } from './server/server';

const app = new ServerBootstrap();
app.dbConnect().then(() => app.synchronizeDB());
app.listen();
