const path = require('path');
const fsPromise = require('fs/promises')

const com =  async () => {
    const pathToFile = path.join(__dirname,'hello.txt')
    await fsPromise.writeFile(pathToFile,'hello world')
    await fsPromise.mkdir(path.join(__dirname, 'baseFolder', 'First-folder'),{recursive:true})
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'First-folder', 'first.txt'), 'first file')
    await fsPromise.mkdir(path.join(__dirname, 'baseFolder', 'Second-folder'),{recursive:true})
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Second-folder', 'second.txt'), 'second file')
    await fsPromise.mkdir(path.join(__dirname, 'baseFolder', 'Third-folder'),{recursive:true})
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Third-folder', 'third.txt'), 'third file')
    await fsPromise.mkdir(path.join(__dirname, 'baseFolder', 'Fourth-folder'),{recursive:true})
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Fourth-folder', 'fourth.txt'), 'four file')
    await fsPromise.mkdir(path.join(__dirname, 'baseFolder', 'Five-folder'),{recursive:true})
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Five-folder', 'five.txt'), 'five file')

    const read = await fsPromise.readdir(path.join(__dirname, 'baseFolder', 'First-folder'),{recursive:true})
    console.log(read)

    const red = await fsPromise.readdir(path.join(__dirname, 'baseFolder', 'Second-folder'),{recursive:true})
    console.log(red)

    const wer = await fsPromise.readdir(path.join(__dirname, 'baseFolder', 'Third-folder'),{recursive:true})
    console.log(wer)

    const rty = await fsPromise.readdir(path.join(__dirname, 'baseFolder', 'Fourth-folder', ),{recursive:true})
    console.log(rty)

    const dfg = await fsPromise.readdir(path.join(__dirname, 'baseFolder', 'Five-folder'),{recursive:true})
    console.log(dfg)


    const stat = await fsPromise.stat(path.join(__dirname, 'baseFolder', 'First-folder', 'file.txt'));
    console.log(stat.isFile())
    console.log(stat.isDirectory())

    const tat = await fsPromise.stat(path.join(__dirname, 'baseFolder', 'Second-folder', 'file.txt'));
    console.log(tat.isFile());
    console.log(tat.isDirectory());

    const yui = await fsPromise.stat(path.join(__dirname, 'baseFolder', 'Third-folder', 'file.txt'));
    console.log(yui.isFile());
    console.log(yui.isDirectory());

    const iop = await fsPromise.stat(path.join(__dirname, 'baseFolder', 'Fourth-folder', 'file.txt'));
    console.log(iop.isFile());
    console.log(iop.isDirectory());

    const pas = await fsPromise.stat(path.join(__dirname, 'baseFolder', 'Five-folder', 'file.txt'));
    console.log(pas.isFile());
    console.log(pas.isDirectory());
}
void com()
