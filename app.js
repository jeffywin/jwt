// 后端 前端 npm i -g @/vue/cli  vue create jwt-front
let express = require('express')
let bodyParser = require('body-parser')
let jwt = require('jwt-simple')
//数据库
let User = require('./model/user')
//监听函数
let app = express()
let {secret} = require('./config')
//中间件一定是函数，处理发回来的json类型，还有text，urlencoded(a=b&c=d)
app.use(bodyParser.json())

//防止跨域 request请求 response响应
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Content-type,Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT,OPTIONS');
    if(req.method === 'OPTIONS') {
        res.end()
    }else {
        next()
    }
})

//注册
app.post('/reg', async function(req, res, next){
    let user = req.body;
    try {
        user = await User.create(user) 
        res.json({//返回信息
            code: 0,
            data: {
                user: {
                    id: user._id,
                    username: user.username
                }
            }
        })
    } catch (error) {
        res.json({
            code: 1,
            data: '注册失败'
        })
    }  
})
//登录
app.post('/login', async function(req,res,next){
    let user = req.body;
    user = await User.findOne(user)//数据库中查找
    if(user) {
        let token = jwt.encode({
            id: user._id,
            username: user.username
        },secret);
        res.json({//返回信息
            code: 0,
            data: { token }
        })
    }else {
        res.json({
            code: 1,
            data: '用户不存在'
        })
    }
}) 
// 用户校验 中间件
let auth = function(req, res, next){
    //post模拟时 添加Headers Authorization: Bearer token的值
    let authorization = req.headers['authorization']
    if(authorization) {
        let token = authorization.split(' ')[1];
        try {
            //看token是否合法，解码，如果串改过token就解不出来,进入异常页面
            let user = jwt.decode(token, secret);
            req.user = user;//后面就可以拿到user，中间件用法 
            next();//下一步
        } catch (error) {
            console.log(error)
            res.status(401).send('Not Allowed')
        }
    } else {
        res.status(401).send('Not Allowed');
    }
}
//发送请求，看看能不验证成功auth，如果可以拿到返回数据
app.get('/order', auth, function(req,res,next){
    res.json({
        code: 0,
        data: {
            user: req.user
        }
    })
})

app.listen(3000)