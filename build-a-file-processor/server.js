// Starter file — add your code here
const fs = require('fs');
const fsPromises = require('fs').promises;
const crypto = require('crypto');
const os = require('os');
const path = require('path');

async function main() {
    const data = await fsPromises.readFile('assets/poem.txt', { encoding: 'UTF8'});
    console.log(data);
}

main();

fs.writeFileSync('assets/output.txt', 'Hello, freeCodeCamp!');
fs.appendFileSync('assets/output.txt', '\nWorking via Codespaces!')

const exists = fs.existsSync('assets/output.txt');
console.log(exists);

const entries = fs.readdirSync('assets');
console.log(entries);

const buf = Buffer.from('Hello, Node!');
console.log(buf);
console.log(buf.toString('hex'));
console.log(buf.toString('base64'));

const buf2 = Buffer.alloc(8, 0xff);
console.log(buf2);

const decoded = Buffer.from('ZnJlZUNvZGVDYW1w', 'base64').toString('utf8');
console.log(decoded);

const hash = crypto.createHash('sha256').update('freeCodeCamp!').digest('hex');
console.log(hash);

const random = crypto.randomBytes(16).toString('hex');
console.log(random);

const id = crypto.randomUUID();
console.log(id);

const platform = os.platform();
const arch = os.arch();
const host = os.hostname();
console.log(`${platform},\n${arch},\n${host}`);

console.log(`${os.totalmem()}`);
console.log(`${os.freemem()}`);
console.log(`${os.uptime()}`);

console.log(os.cpus().length);

const fullpath = path.join(__dirname, 'assets', 'poem.txt');
console.log(fullpath);

console.log(path.basename(fullpath));
console.log(path.dirname(fullpath));
console.log(path.extname(fullpath));

console.log(path.join('assets', '..', 'server.js'));
console.log(path.resolve('assets', '..', 'server.js'));

const parts = path.parse(fullpath);
console.log(parts);

console.log(process.version);
console.log(process.platform);
console.log(process.env);

console.log(`${process.argv}`);

console.log(`${process.stdout.write('Hello from stdout\n')}`);
console.log(`${process.stderr.write('Hello from stderr\n')}`);

const readable = fs.createReadStream('assets/poem.txt', { encoding: 'utf8' });

readable.on("data", (chunk) => {
    console.log(chunk);
});

readable.on("end", () => {
    console.log('Done Reading');
});


const writeable = fs.createWriteStream('assets/stream-output.txt');
writeable.write('Chunk 1 added\n');
writeable.write('Chunk 2 added now\n');
writeable.end();

const readable = fs.createReadStream('assets/poem.txt');
const writeable = fs.createWriteStream('assets/stream-output.txt');
readable.pipe(writeable);