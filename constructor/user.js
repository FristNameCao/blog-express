const { exec, escpape } = require("../db/mysql")
const { genPassword } = require("../utlis/cryp")
const login = ((username, password) => {

    username = escpape(username)
    // 生成加密密码
    password = genPassword(password)
    password = escpape(password)
    const sql = `select username,realname from 
    users where username = ${username} and password = ${password}; `
    return exec(sql).then((rows) => {
        return rows[0] || {}
    })
})

module.exports = {
    login
}