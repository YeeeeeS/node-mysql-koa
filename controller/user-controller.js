const userModal     = require('../lib/usersql');
const checkNotLogin = require('../middlewares/check').checkNotLogin;
const fs            = require('fs')
const md5           = require('md5');
const moment        = require('moment');

//  注册页面
exports.userRegister = async (ctx) => {
  let avatarUrl;
  await checkNotLogin(ctx);
  await ctx.render('register', {
    title: '注册',
    session: ctx.session,
    avatar: avatarUrl
  })
} 

// 注册提交
exports.userSubmitRegister = async (ctx) => {
  const { userName, userPwd, userAvatar } = ctx.request.body
  
  await userModal.searchUser(userName)
      .then(async res => {
        if (res.length > 0) {
          ctx.body = {
            code: 0,
            message: '用户名重复！'
          }
        }
        else {
          // 插入用户信息
          //insertAbleUser(ctx, userName, userPwd, userAvatar)
          let base64Data = userAvatar.replace(/^data:image\/\w+;base64,/, ""),
              dataBuffer = new Buffer(base64Data, 'base64'),
              getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now(),
              upload = await new Promise((reslove, reject) => {
                  fs.writeFile('./public/images/' + getName + '.png', dataBuffer, err => {
                      if (err) {
                          throw err;
                          reject(false)
                      };
                      reslove(true)
                  });
              });
          
          if (upload) {
            console.log(getName)
            await userModal.insertUser([
              userName,
              md5(userPwd),
              getName,
              moment().format('YYYY-MM-DD HH:mm:ss')])
                  .then(res => {
                    ctx.body = {
                      code: 1,
                      message: '注册成功!'
                    };
                  })
          }
          else {
            ctx.body = {
              code: 0,
              message: '头像上传失败！'
            }
          }
        }
      })
      .catch(err => {
        console.log(err)  
      })
}

// 登录页面
exports.userLogin = async (ctx) => {
  await checkNotLogin(ctx);
  await ctx.render('login', {
    title: '登录',
    session: ctx.session
  })
}

exports.userSuccessLogin = async ctx => {
  const { userName, userPwd } = ctx.request.body
  await userModal.searchUser(userName)
        .then(res => {
          console.log(res)  
          if (res.length > 0 &&
            res[0].name === userName &&
            res[0].pass === md5(userPwd)) {
            
            ctx.session = {
              user: res[0]['name'],
              id: res[0]['id']
            }
            ctx.body = {
              code: 1,
              message: '登录成功'
            }
          }
          else {
            ctx.body = {
              code: 0,
              message: '用户名或密码错误！'
            }
          }
        })
}