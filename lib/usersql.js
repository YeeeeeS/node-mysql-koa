// import { createTable, query } from './mysql';
const sqlModal = require('./mysql');

const users = `
  create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    avatar VARCHAR(100) NOT NULL,
    moment VARCHAR(100) NOT NULL,
    PRIMARY KEY( id )
  )
`

// 建表
sqlModal.createTable(users);

// 新增用户
const insertUser = (value) => {
  const _sql = "insert into users set name=?,pass=?,avatar=?,moment=?;"
  return sqlModal.query(_sql, value)
}

// 删除用户
const deleteUser = (name) => {
  const _sql = `delete FROM users where name="${name}";`
  return sqlModal.query(_sql)
}

// 更改用户
const updateUser = (value) => {
  const _sql = 'update users set pass=? where name=?'
  return sqlModal.query(_sql, value)
}

// 查找用户
const searchUser = (name) => {
  const _sql = `select * FROM users where name="${name}";`
  return sqlModal.query(_sql)
}

// 通过用户名字查找用户

module.exports = {
  insertUser,
  deleteUser,
  updateUser,
  searchUser
}