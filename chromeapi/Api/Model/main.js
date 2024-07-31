/**
 * MongoDB数据库操作:mongoose对象模型库之中间件pre和post钩子
 */
const mongoose = require("mongoose");

// 連接到你的資料庫
async function main() {
  //与数据库建立连接
  // await mongoose.connect("mongodb://127.0.0.1:27017/test");
  mongoose.connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const conn = mongoose.connection;

  conn.on("error", (err) => {
    console.error("数据库连接失败：" + err);
  });
  conn.once("open", () => {
    console.log("数据库连接成功！");
  });

  // 做法2: if your database has auth enabled
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');`
}

exports.main = main;

// main().catch((err) => console.log(err));
