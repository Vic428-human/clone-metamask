const mongoose = require("mongoose");

// make sure every value is equal to "something"
function validator(val) {
  return val === this.password;
}

//設計資料格式
const userSchema = new mongoose.Schema({
  //   name: String,
  name: {
    type: String,
    required: [true, "請輸入你的名字"],
  },
  username: {
    type: String,
    required: [true, "請輸入你的信箱"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "請輸入你的密碼"],
  },
  passwordComfirm: {
    type: String,
    required: [true, "請再次確認你的密碼"],
    validate: validator,
  },
  address: String,
  private_Key: String,
  mnemonic: String,
});

// TODO:
userSchema.pre("save", async function () {
  await doStuff();
  await doMoreStuff();
});

//準備一個模型
const Token = mongoose.model("Token", userSchema);

module.exports = Token;

// 模板創建一個新的記錄
// const accountOne = new Account({
//   privateKey: "privateKeyOne",
//   address: "addressOne",
// });
// console.log(accountOne.privateKey); // 'privateKey'
