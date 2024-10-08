import { fork } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const spawnChildProcess = async (args) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'script.js');
    const cp = fork(filePath, args);

    cp.on('message', (message) => {
        console.error(`Received from master process: ${message}`);
    });

    cp.on('close', (code) => {
        console.error(`Child process exited code ${code}`);
    });
};

spawnChildProcess(['arg1', 'arg2', 'arg3']);
