import { parentPort, workerData  } from 'worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    const { number } = workerData;

    const result = nthFibonacci(number);

    parentPort.postMessage({ status: 'resolved', data: result });
};

sendResult();