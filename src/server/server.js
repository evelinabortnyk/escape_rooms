import http from 'node:http'
import fs from 'node:fs'

const PORT = 8080

const questsArr = JSON.parse(
    fs.readFileSync('./quests.json', 'utf-8')
)

// let questsArr = null
let reserveArr = []

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
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

                return res.end(JSON.stringify(quest));
            } 
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
    
            return res.end(JSON.stringify({
                message: 'Quest not found'
            }));
            
        }
        
        if (questsArr) {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
    
            return res.end(JSON.stringify(questsArr));
        }
    
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
    
        return res.end(JSON.stringify({
            message: 'No quests loaded'
        }));
    } else if(req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    } else if (req.method === 'POST' && req.url === '/reserve') {
        console.log(req.method, req.url);
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        });

        req.on('end', () => {
            const newUser = JSON.parse(body) 
            newUser.id = reserveArr.length + 1
            reserveArr.push(newUser)

            return res.end(JSON.stringify(reserveArr))
        })
        return;
    }  else if (req.method === 'GET' && req.url === '/reserve') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
    
        return res.end(JSON.stringify(reserveArr));

    } 
    res.end();
}).listen(PORT)