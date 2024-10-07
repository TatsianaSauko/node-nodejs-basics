import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const copy = async () => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const directoryPathFiles = path.join(__dirname, 'files');
        const directoryPathFiles_copy = path.join(__dirname, 'files_copy');

        await fs.mkdir(directoryPathFiles_copy);

        const files = await fs.readdir(directoryPathFiles);
        
        for (const file of files) {
            const srcFile = path.join(directoryPathFiles, file);
            const destFile = path.join(directoryPathFiles_copy, file);
            await fs.copyFile(srcFile, destFile);
        }
    } catch {
        throw new Error('FS operation failed');
    }
};

await copy();
