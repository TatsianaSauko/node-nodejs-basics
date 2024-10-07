import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';

const decompress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePathArchive = path.join(__dirname, 'files', 'archive.gz');
    const filePathFileToCompress = path.join(__dirname, 'files', 'fileToCompress.txt');

    try {
        await fs.promises.access(filePathArchive);
    } catch (err) {
        console.error('File archive.gz does not exist.');
        return;
    }

    await pipeline(
        fs.createReadStream(filePathArchive),
        zlib.createGunzip(),
        fs.createWriteStream(filePathFileToCompress),
    );
};

await decompress();
