let template = require('art-template');
// var html = template(__dirname + '/my.art', {
//     user: {
//         name: 'aui'
//     }
// });
// console.log(html)

// 基于模板名渲染模板
// template(filename, data);
let tpl = `<% if (user) { %>
    <h2><%= user.name %></h2>
  <% } %>`
    // 将模板源代码编译成函数
    //template.compile(source, options);
    // let render = template.compile(tpl);
    // let ret = render({
    //     user: {
    //         name: 'aui'
    //     }
    // })
    // console.log(ret)
    // 将模板源代码编译成函数并立刻执行


// template.render(source, data, options);
let res = template.render(tpl, {
    user: {
        name: 'lisi'
    }
});
console.log(res)