const { exec } = require("child_process");
const fs = require("fs");

function isVideo(filename) {
    return filename.match(/\S*\.[mkv|mp4]/);
}

const videos = fs.readdirSync("./").filter((video) => isVideo(video));
videos.forEach((video) => {
    exec(`ffprobe ${video}`, (res) => {
        if (res && res.code === 1) {
            console.log("🚀 ~ Corrupt video ~ ", video);
        }
    });
});
