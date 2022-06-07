const fs = require("fs");
const path = require("path");

function readFileRecursive(dir) {
    let arr = [];
    let files = fs.readdirSync(dir);
    files.forEach((file) => {
        let fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            arr.push(...readFileRecursive(fullPath));
        } else {
            arr.push(fullPath);
        }
    });
    return arr;
}

module.exports = {
    readFileRecursive,
}