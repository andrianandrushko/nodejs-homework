const path = require('path');
const fsPromise = require('fs/promises')

const com =  async () => {
    const pathToFile = path.join(__dirname,'hello.txt')
    await fsPromise.writeFile(pathToFile,'hello world')
    await fsPromise.mkdir(path.join(__dirname, 'baseFolder', 'First-folder'),{recursive:true})
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'First-folder', 'first.txt'), '1')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'First-folder', 'second.txt'), '2')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'First-folder', 'third.txt'), '3')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'First-folder', 'fourth.txt'), '4')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'First-folder', 'five.txt'), '5')



    await fsPromise.mkdir(path.join(__dirname, 'baseFolder', 'Second-folder'),{recursive:true})
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Second-folder', 'first.txt'), '1')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Second-folder', 'second.txt'), '2')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Second-folder', 'third.txt'), '3')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Second-folder', 'fourth.txt'), '4')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Second-folder', 'five.txt'), '5')




    await fsPromise.mkdir(path.join(__dirname, 'baseFolder', 'Third-folder'),{recursive:true})
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Third-folder', 'first.txt'), '1')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Third-folder', 'second.txt'), '2')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Third-folder', 'third.txt'), '3')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Third-folder', 'fourth.txt'), '4')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Third-folder', 'five.txt'), '5')



    await fsPromise.mkdir(path.join(__dirname, 'baseFolder', 'Fourth-folder'),{recursive:true})
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Fourth-folder', 'first.txt'), '1')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Fourth-folder', 'second.txt'), '2')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Fourth-folder', 'third.txt'), '3')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Fourth-folder', 'fourth.txt'), '4')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Fourth-folder', 'five.txt'), '5')



    await fsPromise.mkdir(path.join(__dirname, 'baseFolder', 'Five-folder'),{recursive:true})
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Five-folder', 'first.txt'), '1')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Five-folder', 'second.txt'), '2')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Five-folder', 'third.txt'), '3')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Five-folder', 'fourth.txt'), '4')
    await fsPromise.writeFile(path.join(__dirname, 'baseFolder', 'Five-folder', 'five.txt'), '5')



    const path1 = path.join(__dirname, 'baseFolder', 'First-folder', 'first.txt')
    const stat1 = await fsPromise.stat(path1)
    console.log(path1, stat1.isFile() ? 'файл' : 'папка')

    const path2 = path.join(__dirname, 'baseFolder', 'First-folder', 'second.txt')
    const stat2 = await fsPromise.stat(path2)
    console.log(path2,stat2.isFile() ? 'файл' : 'папка')

    const path3 = path.join(__dirname, 'baseFolder', 'First-folder', 'third.txt')
    const stat3 = await fsPromise.stat(path3)
    console.log(path3,stat3.isFile() ? 'файл' : 'папка')

    const path4 = path.join(__dirname, 'baseFolder', 'First-folder', 'fourth.txt')
    const stat4 = await fsPromise.stat(path4)
    console.log(path4, stat4.isFile() ? 'файл' : 'папка')

    const path5 = path.join(__dirname, 'baseFolder', 'First-folder', 'five.txt')
    const stat5 = await fsPromise.stat(path5)
    console.log(path5, stat5.isFile() ? 'файл' : 'папка')

    console.log()


    const path6 = path.join(__dirname, 'baseFolder', 'Second-folder', 'first.txt')
    const stat6 = await fsPromise.stat(path6)
    console.log(path6, stat6.isFile()? 'файл' : 'папка')

    const path7 = path.join(__dirname, 'baseFolder', 'Second-folder', 'second.txt')
    const stat7 = await fsPromise.stat(path7)
    console.log(path7, stat7.isFile() ? 'файл' : 'папка')

    const path8 = path.join(__dirname, 'baseFolder', 'Second-folder', 'third.txt')
    const stat8 = await fsPromise.stat(path8)
    console.log(path8, stat8.isFile() ? 'файл' : 'папка')

    const path9 = path.join(__dirname, 'baseFolder', 'Second-folder', 'fourth.txt')
    const stat9 = await fsPromise.stat(path9)
    console.log(path9, stat9.isFile() ? 'файл' : 'папка')

    const path10 = path.join(__dirname, 'baseFolder', 'Second-folder', 'five.txt')
    const stat10 = await fsPromise.stat(path10)
    console.log(path10,stat10.isFile() ? 'файл' : 'папка')

    console.log()

    const path11 = path.join(__dirname, 'baseFolder', 'Third-folder', 'first.txt')
    const stat11 = await fsPromise.stat(path11)
    console.log(path11,stat11.isFile() ? 'файл' : 'папка')

    const path12 = path.join(__dirname, 'baseFolder', 'Third-folder', 'second.txt')
    const stat12 = await fsPromise.stat(path12)
    console.log(path12,stat12.isFile() ? 'файл' : 'папка')

    const path13 = path.join(__dirname, 'baseFolder', 'Third-folder', 'third.txt')
    const stat13 = await fsPromise.stat(path13)
    console.log(path13, stat13.isFile() ? 'файл' : 'папка')

    const path14 = path.join(__dirname, 'baseFolder', 'Third-folder', 'fourth.txt')
    const stat14 = await fsPromise.stat(path14)
    console.log(path14,stat14.isFile() ? 'файл' : 'папка')

    const path15 = path.join(__dirname, 'baseFolder', 'Third-folder', 'five.txt')
    const stat15 = await fsPromise.stat(path15)
    console.log(path15,stat15.isFile() ? 'файл' : 'папка')

    console.log()

    const path16 = path.join(__dirname, 'baseFolder', 'Fourth-folder', 'first.txt')
    const stat16 = await fsPromise.stat(path16)
    console.log(path16,stat16.isFile() ? 'файл' : 'папка')

    const path17 = path.join(__dirname, 'baseFolder', 'Fourth-folder', 'second.txt')
    const stat17 = await fsPromise.stat(path17)
    console.log(path17,stat17.isFile() ? 'файл' : 'папка')

    const path18 = path.join(__dirname, 'baseFolder', 'Fourth-folder', 'third.txt')
    const stat18 = await fsPromise.stat(path18)
    console.log(path18,stat18.isFile() ? 'файл' : 'папка')

    const path19 = path.join(__dirname, 'baseFolder', 'Fourth-folder', 'fourth.txt')
    const stat19 = await fsPromise.stat(path19)
    console.log(path19,stat19.isFile() ? 'файл' : 'папка')

    const path20 = path.join(__dirname, 'baseFolder', 'Fourth-folder', 'third.txt')
    const stat20 = await fsPromise.stat(path20)
    console.log(path20,stat20.isFile() ? 'файл' : 'папка')

    console.log()

    const path21 = path.join(__dirname, 'baseFolder', 'Five-folder', 'first.txt')
    const stat21 = await fsPromise.stat(path21)
    console.log(path21, stat21.isFile() ? 'файл' : 'папка')

    const path22 = path.join(__dirname, 'baseFolder', 'Five-folder', 'second.txt')
    const stat22 = await fsPromise.stat(path22)
    console.log(path22,stat22.isFile() ? 'файл' : 'папка')

    const path23 = path.join(__dirname, 'baseFolder', 'Five-folder', 'third.txt')
    const stat23 = await fsPromise.stat(path23)
    console.log(path23,stat23.isFile() ? 'файл' : 'папка')

    const path24 = path.join(__dirname, 'baseFolder', 'Five-folder', 'fourth.txt')
    const stat24 = await fsPromise.stat(path24)
    console.log(path24,stat24.isFile() ? 'файл' : 'папка')

    const path25 = path.join(__dirname, 'baseFolder', 'Five-folder', 'five.txt')
    const stat25 = await fsPromise.stat(path25)
    console.log(path25,stat25.isFile() ? 'файл' : 'папка')

}
void com()
