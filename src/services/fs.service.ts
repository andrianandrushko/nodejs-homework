import path = require("node:path");
import * as fs from "node:fs/promises";
import type {IUser} from "../interfaces/user.interface.js";


const read = async (): Promise<IUser[]> => {
    try {
        const pathToFile = path.join(__dirname, 'db.json')
        const data = await fs.readFile(pathToFile, 'utf-8')
        return data ? JSON.parse(data) : [];
    } catch(err) {
        console.log(err);
        return [];
    }
}

const write = async (users: IUser[]) => {
    try {
        const pathToFile = path.join(__dirname, 'db.json')
        await fs.writeFile(pathToFile, JSON.stringify(users))
    }catch (err) {
        console.log(err);
    }
}


export {read, write};