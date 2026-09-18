import fs from 'fs/promises';
import path from 'path';
import type {IUser} from "../interfaces/user.interface";

const read = async ():Promise<IUser[]> => {
    try {
        const pathToFile = path.join(process.cwd(), 'db.json');
        const data = await fs.readFile(pathToFile, 'utf8');
        return data ? JSON.parse(data) : [];
    }catch(err) {
        console.log(err)
    }
}

const write = async (users:IUser[]):Promise<void> => {
    try {
        const pathToFile = path.join(process.cwd(), 'db.json');
        await fs.writeFile(pathToFile, JSON.stringify(users))
    }catch (e) {
        console.log(e)
    }
}
export  { read, write }