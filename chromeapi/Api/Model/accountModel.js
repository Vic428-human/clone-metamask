const mongoose = require("mongoose");

main().catch((err) => console.log(err));

// 連接到你的資料庫
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//設計資料格式
const accountSchema = new mongoose.Schema({
  privateKey: String,
  address: String,
});

//準備一個模型
const Account = mongoose.model("Account", accountSchema);

module.exports = Account;

// 模板創建一個新的記錄
const accountOne = new Account({
  privateKey: "privateKeyOne",
  address: "addressOne",
});
console.log(accountOne.privateKey); // 'privateKey'
