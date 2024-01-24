import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
    const directoryPath = path.join(__dirname, 'files');
    try {
        await fs.access(directoryPath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('FS operation failed: files does not exist');
            return;
        } else {
            throw error;
        }
    }

    try {
        const files = await fs.readdir(directoryPath);
        for (const file of files) {
            const srcFile = path.join(directoryPath, file);
            console.log(path.basename(srcFile));        }
    } catch (error) {
        console.error(error);
    }
};

await list();
