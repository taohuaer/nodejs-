// 创建一个服务器
const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const scoreData = require('./scores.json');
const template = require('art-template');

http.createServer((req, res) => {
    // 查询成绩的入口地址     // 对请求路径进行判断
    if (req.url.startsWith('/query') && req.method == 'GET') {
        let content = template(path.join(__dirname, "view", "index.art"), {})
        res.end(content);

    } else if (req.url.startsWith('/getScore') && req.method == 'POST') {
        let pdata = ''; // res.end(data)
        req.on('data', (chunk) => {
            pdata += chunk;
        })
        req.on('end', () => {
            let obj = qs.parse(pdata);
            let scorces = scoreData[obj.sid];
            // 返回内容之前需要进行数据渲染
            let content = template(path.join(__dirname, 'view', 'result.art'), scorces);
            res.end(content);
        })
    } else if (req.url.startsWith('/all') && req.method == 'GET') {
        let arr = [];
        for (let key in scoreData) {
            arr.push(scoreData[key])
        }
        //arr[{"chinese":120,"math":20,"chinese":120},{},{}]
        let content = template(path.join(__dirname, "view", "list.art"), {
            list: arr
        })
        res.end(content)
    }
}).listen(3000, () => {
    console.log('running');
})