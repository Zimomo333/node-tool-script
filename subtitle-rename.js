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

let files = readFileRecursive("./");

let movies = files.filter((file) => file.includes(".mkv"));

let assS = files.filter((file) => file.includes(".简体&英文.ass"));

movies.forEach((movie) => {
    let exx = movie.match(/E\d\d/)[0];
    let ass = assS.find((ass) => ass.includes(exx));
    let newSubtitle = movie.replace("mkv", "ass");
    fs.rename(ass, newSubtitle, function (err) {
        if (err) {
            throw err;
        }
    });
});
