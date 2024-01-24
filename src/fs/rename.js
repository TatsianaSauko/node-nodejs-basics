import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    const properFilePath = path.join(__dirname, 'files', 'properFilename.md');
    const wrongFilePath = path.join(__dirname, 'files', 'wrongFilename.txt');
    try {
        await fs.access(properFilePath);
        console.error('FS operation failed: properFilename.md already exists');
        return;
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }
    try {
        await fs.access(wrongFilePath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('FS operation failed: wrongFilename.txt does not exist');
            return;
        } else {
            throw error;
        }
    }
    try {
        await fs.rename(wrongFilePath, properFilePath);
    } catch (error) {
       console.error(error)
    }

};

await rename();
