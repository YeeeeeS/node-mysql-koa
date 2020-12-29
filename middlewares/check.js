module.exports ={
  // 已经登录了
  checkNotLogin: (ctx) => {
    if (ctx.session && ctx.session.user) {     
      ctx.redirect('/post');
      return false;
    }
    return true;
  },
  //没有登录
  checkLogin: (ctx) => {
    if (!ctx.session || !ctx.session.user) {     
      ctx.redirect('/register');
      return false;
    }
    return true;
  }
}