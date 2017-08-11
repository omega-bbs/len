import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {router} from './routes';

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
createConnection().then(async connection => {

    // create koa app
    const app = new Koa();

    // run app
    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());

    const port = process.env.PORT || 8000;

    app.listen(port);

    console.log(`Omega is up and running on port ${port}`);

}).catch(error => console.log('TypeORM connection error: ', error));