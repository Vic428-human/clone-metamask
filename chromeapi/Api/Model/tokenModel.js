const mongoose = require("mongoose");

//設計資料格式
const tokenSchema = new mongoose.Schema({
  name: String,
  address: String,
  symbol: String,
});

//準備一個模型
const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;

// 模板創建一個新的記錄
// const accountOne = new Account({
//   privateKey: "privateKeyOne",
//   address: "addressOne",
// });
// console.log(accountOne.privateKey); // 'privateKey'
