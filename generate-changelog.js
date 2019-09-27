const fs = require('fs');
const writeStream = fs.createWriteStream('CHANGELOG.md');
const firstCommit = 'd82ff8d9ee4e6a301c42dc0f74a8c13b35aaed23';
const { spawn } = require('child_process');

const changelog = spawn('./node_modules/.bin/lerna-changelog', [`--from=${firstCommit}`]);

changelog.stdout
    .on('data', chunk => {
        const commitString = chunk.toString();
        console.log(commitString);
        writeStream.write(commitString);
    })
    .on('end', () => {
        writeStream.end();
    });
