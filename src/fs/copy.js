import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const directoryPathFiles = path.join(__dirname, 'files');
    const directoryPathFiles_copy = path.join(__dirname, 'files_copy');

    try {
        await fs.access(directoryPathFiles_copy);
        throw new Error('FS operation failed: files_copy already exists');
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }

    try {
        await fs.access(directoryPathFiles);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('FS operation failed: source directory does not exist');
            return;
        } else {
            throw error;
        }
    }

    try {
        await fs.mkdir(directoryPathFiles_copy);
    
        const files = await fs.readdir(directoryPathFiles);
        for (const file of files) {
            const srcFile = path.join(directoryPathFiles, file);
            const destFile = path.join(directoryPathFiles_copy, file);
            await fs.copyFile(srcFile, destFile);
        }
    } catch (error) {
        console.error('Failed to copy files:', error);
    }
};

await copy();
