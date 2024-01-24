import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
  const filePath = path.join(__dirname, 'files', 'fresh.txt');
  try {
    await fs.access(filePath);
    throw new Error('FS operation failed: file already exists');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(filePath, 'I am fresh and young');
    } else {
      throw error;
    }
  }
};

await create();
