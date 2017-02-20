/**
 * Created by Wangfei on 2017/2/14.
 */
var express = require('express');
var mongoose = require('mongoose');//导入mongoose模块
var checkParams = require('../middleware/checkPost');//检查发布文章参数是否合法的中间件

var Blog = require('../models/post');//导入模型数据模块

var router = express.Router();
var idCreater = 1;

//新增加一片博客
//检查必要的参数
router.post('/', checkParams);
router.post('/', function (req, res) {
    var now = new Date().getTime();
    var blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        description: req.body.description,
        status: req.body.status,
        category: req.body.category,
        tag: req.body.tag,
        createAt: now,
        lastUpdate: now,
        readCount: 0,
        author: 'X-Codder'
    });
    blog.save();
    console.log('新增一条blog记录!');
    //res.writeHead(200,{'Content-Type':'text/json;charset=utf-8'});
    res.json(JSON.stringify(blog));
})

//请求文章列表，默认返回10篇，按时间降序
router.get('/', function (req, res) {
    var limit = parseInt(req.query.limit) || 10;
    var sortby = req.query.sortby || 'createAt';
    var order = req.query.order || 'desc';
    //该接口用于请求博文列表，将文章内容去掉，减少数据传输量
    Blog.find({}).sort('-createAt').limit(limit).exec(function (err, blogs) {
        var cBlogs = blogs.map(function (blog) {
            blog.content = null;
            return blog;
        });
        res.json(cBlogs);
    })
});

//按文章ID请求文章具体内容
router.get('/id/:id', function (req, res, next) {
    var id = req.params.id || '';
    Blog.findOne({_id: id}, function (err, blog) {
        if (err) {
            console.log('没有检索到请求的blog!');
            var err = new Error('Blog Not Found');
            err.status = 404;
            next(err);
        } else {
            res.json(blog);
        }
    })
});

module.exports = router;