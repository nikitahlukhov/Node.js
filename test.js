const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {
    let reqObj = {
        method: req.method,
        url: req.url,
        time: Date.parse(new Date()),
    }

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    
    fs.readFile('someJsonFile.json', 'utf8', function (err, data) {
        if (err) {
            let obj = {
                logs: [reqObj],
            };

            fs.writeFileSync('someJsonFile.json', JSON.stringify(obj))

            res.end(JSON.stringify({
                status: res.statusMessage
            }))
        } else {
            if (req.url === '/logs') {
                res.end(data)
            } else {
                let obj = JSON.parse(data);
                obj.logs.push(reqObj);

                fs.writeFileSync('someJsonFile.json', JSON.stringify(obj))

                res.end(JSON.stringify({
                    status: res.statusMessage
                }))
            }
        }
    })
})

server.listen(3000);