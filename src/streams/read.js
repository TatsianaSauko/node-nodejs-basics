import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
    const readStream = fs.createReadStream(filePath);

    readStream.on('data', function(chunk) {
        process.stdout.write(chunk);
    });

    readStream.on('end', () => {
        process.stdout.write('\n');
    });

    readStream.on('error', function(err) {
        console.error('An error has occurred.', err);
    });

};

await read();
