// import { createTable, query } from './mysql';
const sqlModal = require('./mysql');

const posts = `
  create table if not exists posts(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    title TEXT(0) NOT NULL,
    content TEXT(0) NOT NULL,
    md TEXT(0) NOT NULL,
    userid VARCHAR(40) NOT NULL,
    moment VARCHAR(100) NOT NULL,
    comments VARCHAR(200) NOT NULL DEFAULT '0',
    views VARCHAR(40) NOT NULL DEFAULT '0',
    avatar VARCHAR(100) NOT NULL,
    PRIMARY KEY ( id )
  )
`
// 建表posts
sqlModal.createTable(posts);

// 发表文章
const insertPost = (value) => {
  const _sql = 'insert into posts set name=?,title=?,content=?,md=?,userid=?,moment=?,avatar=?;'
  return sqlModal.query(_sql, value)
}

// 删除文章
const deletePost = (id) => {
  const _sql = `delete from posts where id="${id}";`
  return sqlModal.query(_sql, value)
}

// 更新文章
const updatePost = (values) => {
  const _sql = 'update posts set title=?,content=?,md=? where id=?'
  return sqlModal.query(_sql, values)
}

// 更新文章评论数
const updatePostComment = (value) => {
  const _sql = 'update posts set comments=? where id=?'
  return sqlModal.query(_sql, value)
}

// 更新浏览数
const updateViews = (value) => {
  const _sql = 'update posts set views=? where id=?'
  return sqlModal.query(_sql, value)
}

// 查找所有文章
const findPostsList = (value) => {
  const _sql = 'select * FROM posts;'
  return sqlModal.query(_sql, value)
}

// 通过文章名字查找文章
const findPostByName = (name) => {
  const _sql = `select * FROM posts where name="${name}";`
  return sqlModal.query(_sql)
}

// 通过文章id查找文章
const findPostById = (id) => {
  const _sql = `select * FROM posts where id="${id}";`
  return sqlModal.query(_sql)
}

// 查询文章分页
const findPostByPage = (page, rows) => {
  const _sql = `select * FROM posts limit ${(page - 1) * rows},${rows};`
  return sqlModal.query(_sql)
}

// 查询个人文章分页
const findPostByUserPage = (name, page, rows) => {
  const _sql = `select * FROM posts where name=${name} order by id desc limit ${(page - 1) * rows},${rows};`
  return sqlModal.query(_sql)
}

// 查询文章条数
const findPostCounts = (value) => {
  let _sql = `select count(*) as count from posts;`
  return sqlModal.query(_sql, value)
}

module.exports = {
  insertPost,
  deletePost,
  updatePost,
  updateViews,
  findPostById,
  findPostsList,
  findPostByName,
  findPostByPage,
  findPostCounts,
  updatePostComment,
  findPostByUserPage
}