import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'files', 'fresh.txt');
  try {
    await fs.writeFile(filePath, 'I am fresh and young', {flag: 'wx'});
  } catch {
     throw new Error('FS operation failed');
  }
};

await create();
