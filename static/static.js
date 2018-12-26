const fs = require('fs');
const path = require('path');
const mime = require('./mime.json');
// 封装根据不同路径读取文件并把文件内容响应到浏览器的函数
exports.staticServer = (root, req, res) => {
    fs.readFile(path.join(root, req.url), 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, {
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