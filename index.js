const http = require('http')
const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 3000

const server = http.createServer(function(req, res) {
    let fileName = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)

    let extname = path.extname(fileName)

    let contentType = 'text/html'
    switch (extname){
        case '.js':
            contentType = 'text/javascript'
            break
        case '.css':
            contentType = 'text/css'
            break
        case '.png':
            contentType = 'image/png'
            break
    }

    fs.readFile(fileName, function(err, data) {
        if(err) {
            res.writeHead(404)
            res.write('Error: file not found.')
        }else {
            res.writeHead(200, { 'Content-Type': contentType })
            res.end(data, 'utf8')
        }
    })
})

server.listen(port, function(err) {
    if(err) {
        console.error("Error: ", err)
    }else {
        console.log(`Server is listening on port: ${port}`)
    }
})