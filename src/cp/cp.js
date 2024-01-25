import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    const child = spawn('node', [filePath, ...args], { stdio: ['pipe', 'pipe', 'inherit', 'ipc'] });

    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);

    child.on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });

    child.on('exit', (code, signal) => {
        if (code) console.log(`Process exited with code ${code}`);
        if (signal) console.log(`Process was killed with signal ${signal}`);
    });
};

spawnChildProcess(['arg1', 'arg2', 'arg3']);
