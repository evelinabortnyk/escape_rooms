import http from 'node:http'
const PORT = 8080

let questsArr = null

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Mrthods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    // POST
    if (req.method === 'POST' && req.url === '/dataQuests') {
        let body = ''
        console.log(req.method)

        req.on('data', chunk => {
            body += chunk.toString()
        });

        req.on('end', () => {
            try {
                const parseData = JSON.parse(body)
                questsArr = parseData
                if (typeof (parseData) != 'object') {
                    console.log('!arr')
                    res.writeHead(400, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ error: 'wait Array' }))
                }
                questsArr = parseData
                console.log(req.url)
                res.writeHead(200, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify(parseData))

            } catch (error) {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({ error: 'error' }))
            }
        });

        return;
    } else if (req.method === 'GET' && req.url.startsWith('/dataQuests')) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const id = Number(url.searchParams.get('id'));

        if (id) {
            const quest = questsArr.find(item => item.id === id);

            if (quest) {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify(quest));
            } else {
                res.writeHead(404, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Quest not found'
                }));
            }
        }
    } else if (req.method === 'POST' && req.url === '/gram') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        });
        req.on('end', () => {
            // const newUser = JSON.parse(body) 
            // newUser.id = questsArr.length + 1
            // questsArr.push(newUser)
            // return res.end(JSON.stringify(questsArr))
        })
    } else if (req.method === "GET") {
        if (questsArr) {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(questsArr))
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end('not objekt')
        }
    }

    res.end();
}).listen(PORT)