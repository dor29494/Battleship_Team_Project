import express from 'express'
import morgan from 'morgan'
import log from '@ajar/marker'
import cors from 'cors'

import {connect_db} from './db/mongoose.connection.mjs'
// import task_router from './modules/task/task.router.mjs'
// import user_router from './modules/user/user.router.mjs'
import {error_handler,not_found} from './middleware/errors.handler.mjs'

const { PORT,HOST, DB_URI } = process.env;

const app = express();

// middlewares
app.use(cors());
app.use(morgan('dev'));

// routing
// app.use('/api/tasks', task_router);
// app.use('/api/users' , user_router);

// central error handling
app.use(error_handler);
app.use('*', not_found);

//start the express api server
(async ()=> {
  await connect_db(DB_URI);
  await app.listen(PORT);
  log.magenta(`api is live on`,` ✨ ⚡  http://${HOST}:${PORT} ✨ ⚡`);  
})().catch(log.error)