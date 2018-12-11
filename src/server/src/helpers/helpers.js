const fs = require('fs')
const { promisify } = require('util')

const readdir = promisify(fs.readdir);
const read = promisify(fs.read);

const readFiles = async dir => {
    let names;
    try {
        names = await readdir(dir);
    } catch (e) {
        console.log('e', e);
    }
    
    let files = await Promise.all(names.map(file => {return read(file)}))
    return names.reduce((obj, k, i) => ({...obj, [k]: files[i] }), {})
}

module.exports = readFiles