const postModal  = require('../lib/postsql');
const moment     = require('moment')
const checkLogin = require('../middlewares/check.js').checkLogin;
const md         = require('markdown-it')();

exports.getRedirectPosts = async ctx => {
  ctx.redirect('/post')
}

exports.getPosts = async ctx => {
  let res,
      postCount = 0,
      name = decodeURIComponent(ctx.request.querystring.split('=')[1]);
  if (ctx.request.querystring) {

  }
  else {
    await postModal.findPostByPage(1, 10)
      .then(result => {
        res = result
        console.log('文章列表:', res)
      })
    await postModal.findPostCounts()
      .then(res => {
        postCount = res[0].count
        console.log('文章条数：', postCount)
      })
    console.log(ctx.session)
    await ctx.render('index', {
      title: '首页',
      session: ctx.session,
      posts: res,
      postsLength: postCount,
      postsPageLength: Math.ceil(postCount / 10),
    })
  }
}

exports.userPostsManage = async ctx => {
  await checkLogin(ctx);
  await ctx.render('manage', {
    title: '博客管理',
    session: ctx.session
  })
}

exports.userAddPost = async ctx => {
  await checkLogin(ctx);
  await ctx.render('addPost', {
    title: '新增博客',
    session: ctx.session
  })
}