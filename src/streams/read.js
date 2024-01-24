import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
    const readStream = fs.createReadStream(filePath);

    readStream.on('data', function(chunk) {
        process.stdout.write(chunk);
    });

    readStream.on('error', function(err) {
        console.error('An error has occurred.', err);
    });

};

await read();
