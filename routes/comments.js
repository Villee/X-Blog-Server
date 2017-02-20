/**
 * Created by Wangfei on 2017/2/14.
 */
var express = require('express');
var mongoose = require('mongoose');//导入mongoose模块
var checkParams = require('../middleware/checkComment');//检查发表评论的请求参数是否满足要求

var Comment = require('../models/comment');//导入模型数据模块

var router = express.Router();
var idCreater = 1;

//提交一条新的评论
//检查必要的参数
router.post('/', checkParams);
router.post('/', function (req, res, next) {
    var now = new Date().getTime();
    //昵称、邮箱、个人主页、回复ID可空
    var comment = new Comment({
        postId: req.body.postId,
        nickName: req.body.nickName || "匿名用户",
        email: req.body.email || "",
        homePage: req.body.homePage || "",
        content: req.body.content,
        createAt: now,
        replyId: req.body.replyId || ''
    });
    comment.save(function (err) {
        if (err) {
            console.log(err);
            err.status = 500;
            next(err);
        } else {
            console.log('a new comment saved success!');
            res.json(JSON.stringify(comment));
        }
    });
});

//请求某篇博文所有的评论，按时间降序
router.get('/postId/:id', function (req, res, next) {
    var id = req.params.id || '';
    console.log('接收到请求-->' + id);
    //该接口用于请求所有博文列表，截断发回的文章内容，减少数据传输量
    Comment.find({'postId': id}).sort('-createAt').exec(function (err, comments) {
        if (err) {
            var error = new Error(err.toString());
            error.status = 404;
            next(error);
        } else {
            res.json(comments);
        }
    })
});

module.exports = router;