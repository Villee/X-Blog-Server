/**
 * Created by Wangfei on 2017/2/17.
 */
module.exports = function (req, res, next) {
    if (req.body.title && req.body.content && req.body.description && req.body.category && req.body.tag) {
        next();
    } else {
        console.log('缺少必要的参数!');
        var err = new Error('新增文章请求缺少必要的参数，文章发布失败!');
        err.status = 400;
        next(err);
    }
};