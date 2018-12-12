const fs = require('fs')
const { promisify } = require('util')

const readdir = promisify(fs.readdir);
const read = promisify(fs.readFile);

const readFiles = async dir => {
    console.log(dir)
    let names;
    try {
        names = await readdir(dir);
    } catch (e) {
        console.log('e', e);
    }
    console.log(names)
    let files = await Promise.all(names.map(file => {return read(dir + file)}))
    return names.reduce((obj, k, i) => ({...obj, [k]: files[i] }), {})
}

module.exports = readFiles