/**
 * Created by Wangfei on 2017/2/14.
 */
var mongoose = require('mongoose');
var BlogSchema = require('../schemas/post'); //拿到导出的数据集模块
var Blog = mongoose.model('Blog', BlogSchema); //生成Blog 模型
module.exports = Blog;