import fs from 'fs/promises';
import path from 'path';
const read = async () => {
    try {
        const pathToFile = path.join(process.cwd(), "db.json");
        const data = await fs.readFile(pathToFile, "utf8");
        return data ? JSON.parse(data) : [];
    }
    catch {
        console.log("error");
        return [];
    }
};
const write = async (users) => {
    try {
        const pathToFile = path.join(process.cwd(), 'db.json');
        await fs.writeFile(pathToFile, JSON.stringify(users));
    }
    catch (e) {
        console.log(e);
    }
};
export { read, write };
//# sourceMappingURL=fs.service.js.map