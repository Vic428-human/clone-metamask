const mongoose = require("mongoose");

// 連接到你的資料庫
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
exports.main = main;

// main().catch((err) => console.log(err));
