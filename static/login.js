const http = require('http');
const ss = require('./static.js');
var qs = require('querystring');
const url = require('url');
http.createServer((req, res) => {
    // 启动静态资源服务
    if (req.url.startsWith('/www')) {
        ss.staticServer(__dirname, req, res)
    }
    if (req.url.startsWith('/login')) {
        res.writeHead(200, {
                'Content-Type': 'text/plain;charset=utf8'
            })
            // 拿到请求的类型是get
        if (req.method == 'GET') {
            let parma = url.parse(req.url, true).query;
            if (parma.username == "admin" && parma.password == "123456") {
                res.end("get请求成功")
            } else {
                res.end("get请求失败")
            }
        }

        // 拿到请求的类型是post
        if (req.method == 'POST') {
            let pdata = '';
            req.on('data', (chunk) => {
                pdata += chunk;
            })
            req.on('end', () => {
                let obj = qs.parse(pdata);
                //   res.end(obj.username + obj.password)
                if (obj.username == "admin" && obj.password == "123456") {
                    res.end("post请求成功")
                } else {
                    res.end("post请求失败")
                }
            })
        }
    }
}).listen(3000, () => {
    console.log("login is running")
})