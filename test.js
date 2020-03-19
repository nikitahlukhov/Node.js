const http = require('http');
const fs = require('fs');

const LOG_FILE_NAME = 'logs.json';
const PORT = 4000;

const server = http.createServer((req, res) => {
    const reqData = {
        method: req.method,
        url: req.url,
        time: Date.parse(new Date()),
    };

    res.writeHead(200, {
        'Content-Type': 'application/json',
    });

    fs.readFile(LOG_FILE_NAME, 'utf8', (err, data) => {
        let test;
        if (err) {
            test = {
                logs: [],
            };
        }

        const logData = test || JSON.parse(data);
        logData.logs.push(reqData);

        fs.writeFile(LOG_FILE_NAME, JSON.stringify(logData), () => {});

        if (req.url === '/logs') {
            return res.end(JSON.stringify(logData));
        }

        res.end(JSON.stringify({
            status: res.statusMessage,
        }))
    })
});

server.listen(PORT);
