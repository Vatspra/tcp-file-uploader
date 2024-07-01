const net = require('node:net');
const fs = require('fs/promises');
const path = require('path');
const server = net.createServer(async (client) => {
    console.log('Client connected', `${client.remoteAddress}: ${client.remotePort}`);
    client.once('data', async (chunk) => {
        const fileName = chunk.toString().trim();
        const name = fileName.split('.')[0];
        const ext = fileName.split('.')[1];
        const filePath = path.join(__dirname,  `${name}-${Date.now().toString()}.${ext}`);
        const file = await fs.open(filePath, 'w');
        const fileWriteStream = file.createWriteStream();

        client.on('data', (chunk) => {
            const canContinue = fileWriteStream.write(chunk);
            if(!canContinue) {
                client.pause();
            }
        });
        fileWriteStream.on('drain', () => {
            client.resume();
        });


        client.on('close', () => {
            console.log('Client disconnected');
            if (fileWriteStream) {
                fileWriteStream.end();
            }
        });
    })

})

server.listen(3001, 'localhost', () => {
    console.log('Server listening on port 3001');
})