/**
 * Created by Wangfei on 2017/2/14.
 */
var express = require('express');
var mongoose = require('mongoose');//导入mongoose模块
var checkParams = require('../middleware/checkPost');//检查发布文章参数是否合法的中间件

var Post = require('../models/post');//导入模型数据模块

var router = express.Router();
var idCreater = 1;

//新增加一片博客
//检查必要的参数
router.post('/', checkParams);
router.post('/', function (req, res) {
    var now = new Date().getTime();
    var post = new Post({
        title: req.body.title,
        content: req.body.content,
        description: req.body.description,
        status: req.body.status,
        category: req.body.category,
        tag: req.body.tag,
        createAt: now,
        lastUpdate: now,
        readCount: 0,
        img: req.body.img,
        author: 'X-Codder'
    });
    console.log('get save post req,post title :' + post.title);
    post.save();
    console.log('post saved!');
    //res.writeHead(200,{'Content-Type':'text/json;charset=utf-8'});
    res.json(JSON.stringify(post));
})

//请求文章列表，默认返回10篇，按时间降序
router.get('/', function (req, res) {
    var offset = parseInt(req.query.page) || 0;//偏移页码
    var limit = parseInt(req.query.limit) || 10;//每页条目数量
    var fields = req.query.fields;
    console.log('query for posts list!');
    Post.find({}, fields && fields.split(',')).sort('-createAt').limit(limit).skip(offset * limit).exec(function (err, posts) {
        if (err) {
            res.status = 404;
            res.json(err);
        } else {
            res.status = 200;
            res.json(posts);
        }
    })
});

//查询文章总数
router.get('/id', function (req, res) {
    console.log('query for posts count!');
    Post.find({}, ['_id'], function (err, posts) {
        if (err) {
            console.log(err);
            res.status = 404;
            res.json(err);
        } else {
            res.status = 200;
            res.json(posts);
        }
    })
});

//按文章ID请求文章具体内容
router.get('/id/:id', function (req, res, next) {
    var id = req.params.id || '';
    Post.findOne({_id: id}, function (err, post) {
        if (err) {
            console.log('没有检索到请求的post!');
            var err = new Error('Blog Not Found');
            err.status = 404;
            next(err);
        } else {
            res.json(post);
        }
    })
});

module.exports = router;