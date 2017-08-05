module.exports = {
  //expres端口号
  port:8089,
  // mongodb数据库
  url:"mongodb://localhost:27017/hqy",
  // express-session的默认配置
  session:{
    name:"_session-id",
    secret:"hqy sessionId",
    resave:false,
    saveUninitialized:false,
    cookie:{
      httpOnly:true,
      secure:false,
      maxAge:7*24*60*60*1000
    }
  }
}