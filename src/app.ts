import 'reflect-metadata';
import 'module-alias/register';

import * as bodyParser from 'body-parser';
import express, { Application } from 'express';
import {  InversifyExpressServer } from 'inversify-express-utils';
import path from 'path';
import './api/v1/controllers';
import config from './config';
import container from './container';
import PostgresUtil from '@pbb/utils/PostgresUtil';
import Seed from './seeds/eventLogSeed';
const ruid = require('express-ruid');
const cors = require('@pbb/middlewares/cors')



class App {

    public app: Application;
    private postgresUrl = config.postgresUrl;

    constructor() {

        const server = new InversifyExpressServer(container);
        server.setConfig((app: Application) => {

            app.set('view engine', 'ejs');
            app.set('views', 'views');
            app.use(express.static(path.join(__dirname, '../public')));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(ruid({ setInContext: true }));
            app.use(cors.corsWithOptions)

            this.postgresqlSetup();
        });

        this.app = server.build();
    }


    private async postgresqlSetup(): Promise<void> {
        return await PostgresUtil.postgresqlSetup();
    }
}




(async () => {
    // await Seed.run();
})();

export default new App().app;
