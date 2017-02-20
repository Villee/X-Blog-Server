/**
 * Created by Wangfei on 2017/2/20.
 */
module.exports = function (req, res, next) {
    if (req.body.postId && req.body.content) {
        next();
    } else {
        var err = new Error('新增评论请求缺少必要的参数，评论提交发布失败!');
        err.status = 400;
        next(err);
    }
};