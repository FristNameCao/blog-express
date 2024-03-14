const mysql = require('mysql');
const { MYSQL_CONF } = require('../contfig/db');



// 创建链接对象
const con = mysql.createConnection(MYSQL_CONF);
con.connect()
function filterState(data) {
    if (Array.isArray(data)) {
        return data.filter((item) => item.state === 1)
    }
    return data
}

// 统一执行 sql的函数
function exec(sql) {
    return new Promise((resolve, reject) => {
        if (con) {
            con.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const res = filterState(result)
                    resolve(res)
                }
            })
        }

    })
}


// // 关闭连接
// con.end()

module.exports = {
    exec,
    escpape: mysql.escape
}
