import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const read = async () => {
    try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
    console.log((await fs.readFile(filePath)).toString());
    } catch {
        throw new Error('FS operation failed');
    }
};

await read();
