import { Worker } from 'worker_threads';
import os from 'os';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
    const filePath = path.join(__dirname, 'worker.js');
    const numCPUs = os.cpus().length;

    const results = [];

    const createWorker = (number) => {
        return new Promise((resolve, reject) => {
            const worker = new Worker(filePath, { workerData: { number } });

            worker.on('message', (message) => {
                results.push(message);
                resolve();
            });

            worker.on('error', (error) => {
                results.push({ status: 'error', data: null });
                reject(error);
            });
        });
    };

    const workerPromises = Array.from({ length: numCPUs }, (_, index) => createWorker(index + 10));

    await Promise.all(workerPromises);

    console.log(results);
};

await performCalculations();
