import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
    try {
        await fs.access(filePath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('FS operation failed: fileToRead.txt does not exist');
            return;
        } else {
            throw error;
        }
    }
    try {
        console.log((await fs.readFile(filePath)).toString())
    } catch (error) {
        console.error('Failed to read file:', error)
    }
};

await read();
