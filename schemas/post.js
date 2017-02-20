var mongoose = require('mongoose');

//申明一个mongoons对象
var BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    description: String,
    status: Number,//0:public;1:草稿;2:已删除
    category: [String], //分类
    tag: [String],
    readCount:Number,
    createAt: Date,
    lastUpdate: Date
});

//暴露出去的方法
module.exports = BlogSchema