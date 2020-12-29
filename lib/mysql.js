const mysql  = require('mysql');
const config = require('../config/default');

const pool = mysql.createPool({
  host    : config.database.HOST,
  user    : config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      }
      else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          }
          else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

const createTable = (sql) => {
  return query(sql, [])
}

module.exports = {
  query,
  createTable
}