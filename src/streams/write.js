import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');
    const writeStream = fs.createWriteStream(filePath);

    process.stdin.on('data', function(chunk) {
        writeStream.write(chunk);
    });

    process.stdin.on('end', function() {
        writeStream.end();
    });

    writeStream.on('error', function(err) {
        console.error('An error has occurred.', err);
    });
};

await write();
