import { Transform } from 'stream';

const transform = async () => {
    const reverseText = new Transform({
        transform(chunk, _, callback) {
            this.push(chunk.toString().split('').reverse().join(''));
            callback();
        }
    });

    process.stdin.pipe(reverseText).pipe(process.stdout);
};

await transform();
