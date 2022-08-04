const fs = require("fs");
const { readFileRecursive } = require("./util");

let files = readFileRecursive("./");

let movies = files.filter((file) => file.includes(".mkv"));

let assS = files.filter((file) => file.includes(".srt"));

movies.forEach((movie) => {
    let exx = movie.toLowerCase().match(/s\d\de\d\d/)[0];
    let ass = assS.find((ass) => ass.toLowerCase().includes(exx));
    if(ass) {
        let newSubtitle = movie.replace("mkv", "srt");
        fs.rename(ass, newSubtitle, function (err) {
            if (err) {
                throw err;
            }
        });
    }
});
