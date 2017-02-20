/**
 * Created by Wangfei on 2017/2/20.
 */
var mongoose = require('mongoose');
var CommentSchema = require('../schemas/comment'); //拿到导出的数据集模块
var Comment = mongoose.model('Comment', CommentSchema); //生成Blog 模型
module.exports = Comment;