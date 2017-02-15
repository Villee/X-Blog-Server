/**
 * Created by Wangfei on 2017/2/14.
 */
var express = require('express');
var mongoose = require('mongoose');//导入mongoose模块
var blogContentMaxLen = 200;//博文列表api中文章内容预览长度

var Blog = require('../models/blog');//导入模型数据模块

var router = express.Router();
var idCreater = 1;

//新增加一片博客
router.post('/', function (req, res) {
    var now = new Date().getTime();
    var blog = new Blog({
        blogId: req.body.blogId,
        title: req.body.title,
        content: req.body.content,
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

router.get('/', function (req, res) {
    var limit = parseInt(req.query.limit) || 10;
    var sortby = req.query.sortby || 'createAt';
    var order = req.query.order || 'desc';
    //截断发回的文章内容，减少数据传输量
    Blog.find({}).sort('-createAt').limit(limit).exec(function (err, blogs) {
        var cBlogs = blogs.map(function (blog) {
            if (blog && blog.content.length > blogContentMaxLen) {
                blog.content = blog.content.substring(0, blogContentMaxLen);
            }
            return blog;
        });
        res.json(cBlogs);
    })
})

router.get('/id/:id', function (req, res, next) {
    var id = req.params.id || '';
    console.log('get request for blog,id:' + id);
    Blog.findOne({_id: id}, function (err, blog) {
        console.log(blog);
        if (err) {
            console.log('没有检索到请求的blog!');
            var err = new Error('Blog Not Found');
            err.status = 404;
            next(err);
        } else {
            res.json(blog);
        }
    })
})

module.exports = router;