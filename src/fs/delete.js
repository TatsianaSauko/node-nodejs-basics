import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const remove = async () => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');
        await fs.rm(filePath);
    } catch {
        throw new Error('FS operation failed');
    }
};

await remove();
