import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');
    try {
        await fs.access(filePath);
        await fs.unlink(filePath);

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('FS operation failed: fileToRemove.txt does not exist');
            return;
        } else {
            throw error;
        }
    }
};

await remove();
