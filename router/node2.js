// 响应完整的页面信息
const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('./mime.json')
    // 封装根据不同路径读取文件并把文件内容响应到浏览器的函数
let readFile = (url, req, res) => {
    fs.readFile(path.join(__dirname, 'www', url), 'utf8', (err, data) => {
        if (err) {
            res.writeHead(200, {
                'Content-Type': 'text/plain;charset=utf8'
            })
            res.end('页面不存在')
        } else {
            let dtype = 'text/html';
            // 获取请求文件的后缀名
            let ext = path.extname(req.url);
            // 假如后缀名合理，获取标准的响应格式
            if (mime[ext]) {
                dtype = mime[ext]
            }
            // 假如相应的是文本，设置utf8编码
            if (dtype.startsWith('text')) {
                dtype += ';charset=utf8'
            }
            // 设置响应头
            res.writeHead(200, {
                'Content-Type': dtype
            })
            res.end(data)
        }
    });
}
http.createServer((req, res) => {
    // 处理请求路径分发
    if (req.url.startsWith('/index')) {
        readFile('index.html', req, res);
    } else if (req.url.startsWith('/list')) {
        readFile('list.html', req, res);

    } else if (req.url.startsWith('/style')) {
        readFile('style.css', req, res);
    } else {
        //设置相应的类型和编码
        res.writeHead(200, {
            'Content-Type': 'text/plain;charset=utf8'
        })
        res.end('<h1>页面被叼走了</h1>')
    }
}).listen(3000, () => {
    console.log('app is running....')
})