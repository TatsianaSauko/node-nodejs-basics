import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import zlib  from 'zlib';
import { pipeline }  from 'stream/promises';

const compress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePathFileToCompress = path.join(__dirname, 'files', 'fileToCompress.txt');
    const filePathArchive = path.join(__dirname, 'files', 'archive.gz');
    await pipeline(
        fs.createReadStream(filePathFileToCompress),
        zlib.createGzip(),
        fs.createWriteStream(filePathArchive),
      );
      
};

await compress();
