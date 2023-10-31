import express, { Application } from 'express';
import 'reflect-metadata';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from './interfaces/controller.interface';
import ErrorMiddleware from './middlewares/error.middleware';
import helmet from 'helmet';
import prisma from './utils/database/prismaclient';
import passport from 'passport';
import session from "express-session"

require("./common/strategies/google.strategy")


class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initializeDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling(); 

    }

    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(passport.initialize());
        this.express.use(session({secret:"SECRET",resave:true,saveUninitialized:false}))
        this.express.use(passport.session())
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    } 

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api/', controller.router);
        });
    }

    private initialiseErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    private async initializeDatabaseConnection(): Promise<void> {
        try {
            await prisma.$connect();
            console.log("connected to database");
        } catch (err) {
          console.error('Error connecting to PostgreSQL:', err);
        }
      }
    
    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;