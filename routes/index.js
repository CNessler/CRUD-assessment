var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var articles = db.get('articles');
var checked = require('../public/javascripts/dom.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  articles.find({}, function (err, articles) {
  res.render('index', {articles: articles});

  })
});

router.get('/article/new', function (req, res, next) {
  res.render('article/new')
})

router.post('/article/new', function (req, res, next) {
  var errorCheck = checked.validate(req.body.title, req.body.excerpt, req.body.body);
  console.log(checked.validate);
  if(errorCheck.length > 0){
    res.render('article/new', {errors: errorCheck})
  } else {
  articles.insert({title: req.body.title, url: req.body.url, checked: req.body.checkbox, excerpt: req.body.excerpt, body: req.body.body})
  res.redirect('/')
  }
})

router.get('/article/:id', function (req, res, next) {
  articles.findOne({_id: req.params.id}, function (err, article) {
    res.render('article/show', {article: article})
  })
})

router.get('/article/:id/edit', function (req, res, next) {
  articles.findOne({_id: req.params.id}, function (err, article) {
    res.render('article/edit', {article:article})
  })
})

router.post('/article/:id/edit', function (req, res, next) {
  var errorCheck = checked.validate(req.body.title, req.body.excerpt, req.body.body);
  console.log(checked.validate);
  if(errorCheck.length > 0){
    res.render('article/new', {errors: errorCheck})
  } else {
  articles.update({_id: req.params.id}, {title: req.body.title, url: req.body.url, excerpt: req.body.excerpt, body: req.body.body})
  res.redirect('/')
  }
})

router.post('/article/:id/delete', function (req, res, next) {
  articles.remove({_id: req.params.id})
  res.redirect('/')
})
module.exports = router;
