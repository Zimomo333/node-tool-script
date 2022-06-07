const fs = require("fs");
const { readFileRecursive } = require("./util");

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
