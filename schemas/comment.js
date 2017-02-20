var mongoose = require('mongoose');

//申明一个mongoons.Schema对象
var CommentSchema = new mongoose.Schema({
    postId: String,
    nickName: String,
    email: String,
    homePage: String,
    content: String,
    createAt: Date,
    replyId: String,//回复某个评论的ID
});

//暴露出去的方法
module.exports = CommentSchema;