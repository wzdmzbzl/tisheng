const { readFileSync } = require('fs')
const { resolve } = require('path')


exports.findUser = function (mobile) {
  const userList = JSON.parse(readFileSync(resolve(__dirname, '../data/user.json'), 'utf8'))
  return userList.find(u => u.mobile === mobile)
}

