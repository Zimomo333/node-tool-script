const { exec } = require("child_process");
const { readFileRecursive } = require("./util");

function isVideo(filename) {
    return filename.match(/\S*\.[mkv|mp4]/);
}

const videos = readFileRecursive("./").filter((video) => isVideo(video));
videos.forEach((video) => {
    exec(`ffprobe "${video}"`, (res) => {
        if (res && res.code === 1) {
            console.log(video);
        }
    });
});
