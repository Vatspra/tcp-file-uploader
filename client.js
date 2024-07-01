const net = require('node:net');
const fs = require('fs/promises');
const readline = require('node:readline/promises');
const path = require('path');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

const client = net.createConnection({ host: 'localhost', port: '3001' }, () => {
    console.log('Connected to server');
    sendFileChunkToServer();
});

const sendFileChunkToServer = async () => {
    const filePath = await rl.question('Enter the file path to upload: ');
    const fileName = path.basename(filePath);
    const file = await fs.open(filePath.trim(), 'r');
    const stats = await file.stat();
    const fileReadStream = file.createReadStream();
    const totalFileSize = stats.size;
    let uploaded = 0;
    client.write(fileName);
    fileReadStream.on('data', (chunk) => {
        uploaded+=chunk.length;
        const percentageUploaded = Math.ceil((uploaded/totalFileSize)*100)
        console.log(`Uploading ${percentageUploaded} %`)
        const canContinue = client.write(chunk);
        if(!canContinue) {
            fileReadStream.pause();
        }
    });

    client.on('drain', () => {
        fileReadStream.resume();
    });

    client.on('end', () => {
        client.end();
        console.log('file uploaded')
    })

    client.on('error', (err) => {
        console.error('Connection error:', err.message);
    });
}
