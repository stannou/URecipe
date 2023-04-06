
import * as dotenv from 'dotenv';
//Loading environment variables
dotenv.config();


//Import required modules and set up application
import express, {Request, Response, Application} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from "passport";
import { authenticate } from "./config";
import { connect } from 'mongoose';
import fileUpload  from "express-fileupload";
import mongoose from 'mongoose';
import { authRouter, recipeRouter } from './routes';

const app: Application = express();


mongoose.set('strictQuery', false);

//Configure middleware for the application 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use(helmet());


app.use(
    fileUpload ({
        limits: {fileSize: 50 * 1024 * 1024 },
        abortOnLimit: true,
    })
);


app.use(passport.initialize());

//Passport config
authenticate(passport);


//Setting up application routes
app.use("/auth", authRouter);
app.use("/recipe", recipeRouter);


//Defining route for the ping endpoint
app.get('/ping', (req: Request, res: Response)=>{
    res.send("pong");
});


//Define route for 404 not found error
app.all('*', (req: Request, res: Response) =>{
    res.status(404).json({message: "The route you requested is not found"})
})


//Connecting to Database
const runDB = async () => {
    connect(process.env.MONGODB_URI as string)
    .then(() => console.log("DB connected successfully"))
    .catch(() => console.log("DB not connected"));

};

runDB();

const PORT = process.env.PORT as unknown as number || 5000;


app.listen(PORT, ()=> {
    console.log(`Sever listening on port ${PORT}`);
})