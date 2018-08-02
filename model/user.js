// 操作数据库
let mongoose = require('mongoose');
let {DB_URL} = require('../config');

mongoose.connect(DB_URL,{useNewUrlParser:true})

/**
  * 连接成功
  */
 mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});

//创建Schema
let UsrSchema = new mongoose.Schema({
    username: String,
    password: String
});
module.exports = mongoose.model('User', UsrSchema);
//根据模型创建用户
//let User = mongoose.model('User',UsrSchema);
// User.create({
//     username: 'jeffywin',
//     password: 123
// })
//User.create User.find User.remove
