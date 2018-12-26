// 动态网站
// 根据不同请求路径和参数传递得到不同的内容，浏览器获得的是服务器动态生成的
// 期末开始成绩查询

// 创建一个服务器
const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const scoreData = require('./scores.json')
http.createServer((req, res) => {
    // 查询成绩的入口地址   /query    // 对请求路径进行判断
    if (req.url.startsWith('/query') && req.method == 'GET') {
        fs.readFile(path.join(__dirname, "view", "index.tpl"), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain;charset=utf8'
                });
                res.end("服务器内部发生错误，请联系管理员");
            }
            res.end(data);
        });
    } else if (req.url.startsWith('/getScore') && req.method == 'POST') {
        let pdata = ''; // res.end(data)
        req.on('data', (chunk) => {
            pdata += chunk;
        })
        req.on('end', () => {
            let obj = qs.parse(pdata);
            let scorces = scoreData[obj.sid];
            console.log(scoreData[obj.sid])
            fs.readFile(path.join(__dirname, "view", "result.tpl"), 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain;charset=utf8'
                    });
                    res.end("服务器内部发生错误，请联系管理员");
                }
                // 返回内容之前需要进行数据渲染
                // data = data.replace('@@chinese@@', scoreData[obj.sid].chinese)
                // data = data.replace('@@math@@', scoreData[obj.sid].math)
                // data = data.replace('@@english@@', scoreData[obj.sid].english)
                let content = template.render(__dirname + 'view' + 'result.tpl', scorces)
                res.end(data);
            });
        })
    }
}).listen(3000, () => {
    console.log('running');
})