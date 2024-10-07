import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const list = async () => {
    try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const directoryPath = path.join(__dirname, 'files');
    const files = await fs.readdir(directoryPath);
    console.log(files);      
    } catch {
        throw new Error('FS operation failed');
    }
};

await list();
