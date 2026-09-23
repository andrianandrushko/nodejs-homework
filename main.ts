import express from "express";
import { type NextFunction,type Request, type Response } from "express";
import {ApiError} from "./src/errors/api.error.js";
import {userRouter} from "./src/routes/user.router.js";
import {configs} from "./src/configs/user.config.js";
import * as mongoose from "mongoose";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express()

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
})
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

app.listen(configs.APP_PORT, configs.APP_HOST, async () => {
    await mongoose.connect(configs.MONGO_URI)
    console.log(`server running on http://${configs.APP_HOST}:${configs.APP_PORT}`);
})