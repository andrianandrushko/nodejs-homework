import express from "express";
import { type NextFunction,type Request, type Response } from "express";
import {ApiError} from "./src/errors/api.error.js";
import {userRouter} from "./src/routes/user.router.js";


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/users', userRouter)

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).send({ error: error.message });
    next();
});

process.on('uncaughtException', error => {
    console.log('uncaughtException',error.message, error.stack);
    process.exit(1);
})

app.listen(5000, () => {
    console.log('server running on http://localhost:5000');
})