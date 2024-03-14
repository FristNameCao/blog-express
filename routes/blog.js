var express = require('express');
var router = express.Router();
const { getList, newBlog, updateBlog, deleteBlog, getDetail } = require('../constructor/blog');
const { SuccessModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');
/* GET home page. */
router.get('/list', function (req, res, next) {
  let author = req.query.author || '';
  const keyword = req.query.keyword || '';
  if (req.query.isadmin) {
    if (!req.session?.username) {
      // 未登录
      res.json(
        new SuccessModel('请先登录')
      )
      return
    }
    author = req.session.username
  }
  const result = getList(author, keyword)
  return result.then(data => {

    res.json(new SuccessModel(data))
  })
});

router.get('/detail', loginCheck, (req, res, next) => {
  let id = req.query.id;
  const result = getDetail(id)
  return result.then(data => {
    res.json(new SuccessModel(data))
  })
});

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  return result.then(data => {
    res.json(new SuccessModel(data))
  })
});

router.post('/update', loginCheck, (req, res, next) => {
  const id = req.query.id;
  req.body.author = req.session.username
  const result = updateBlog(id, req.body)
  return result.then(data => {
    res.json(new SuccessModel(data))
  })
})

router.post('/del', loginCheck, (req, res, next) => {
  const id = req.query.id;
  const author = req.session.username
  const result = deleteBlog(id, author)
  return result.then(data => {
    res.json(new SuccessModel(data))
  })
});

module.exports = router;
