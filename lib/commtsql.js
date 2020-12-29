import { createTable, query } from './mysql';

const comment = `
  create table if not exists comment(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    comment TEXT(0) NOT NULL,
    moment VARCHAR(40) NOT NULL,
    postid VARCHAR(40) NOT NULL,
    avatar VARCHAR(100) NOT NULL,
    PRIMARY KEY ( id )
  )
`

// 建表
createTable(comment);

// 发布评论
const insertComment = (value) => {
  const _sql = 'insert into comment set name=?,comment=?,moment=?,postid=?,avatar=?;'
  query(_sql, value)
}

// 删除评论
const deleteComment = (id) => {
  const _sql = `delete comment where id="${id}";`
  query(_sql)
}

// 删除文章下所有评论
const deleteAllComment = (id) => {
  const _sql = `delete from comment from where postid="${id}";`
  query(_sql)
}

// 查询所以评论
const searchComment = (id) => {
  const _sql = `select * from comment where postid="${id}";`
  query(_sql)
}

// 评论分页
const commontByPage = (id, page, rows) => {
  const _sql = `select * from comment where postid=${id} order by id desc limit ${(page-1)*rows},${rows};`
  return query(_sql)
}

module.exports = {
  insertComment,
  deleteComment,
  commontByPage,
  searchComment,
  deleteAllComment
}