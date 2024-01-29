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
        throw new Error('FS operation failed: properFilename.md already exists');
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }
    try {
        await fs.access(wrongFilePath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed: wrongFilename.txt does not exist');
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
