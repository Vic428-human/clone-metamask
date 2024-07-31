const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
import { getTimestampOneSecondAgo } from "../utils/tools";

// make sure every value is equal to "something"
function validator(val) {
  return val === this.password;
}

//模式定义:主要指定对应的MongoDB集合的字段和字段类型。
const userSchema = new mongoose.Schema({
  //   name: String,
  name: {
    type: String,
    required: [true, "請輸入你的名字"],
  },
  email: {
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

/*
  MEMO:
   在 update()、findOneAndUpdate() 等操作上不会执行 pre 和 post save() 钩子
   使用 findById() 和 user.save() 会更好。
*/

//pre钩子注册：
userSchema.pre("init", (doc) => {
  console.log("pre-init");
});
userSchema.pre("validate", (next) => {
  console.log("validate");
  next();
});

userSchema.pre("save", async function (next) {
  console.log("save");
  // Only run this function if password was moddified (not on other update functions)
  if (!this.isModified("password")) return next();
  // Hash password with strength of 12
  this.password = await bcrypt.hash(this.password, 12);
  // remove the confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", async function (next) {
  console.log("save");
  // Only run this function if password was moddified (not on other update functions)
  if (!this.isModified("password")) return next();

  this.passwordChangeAt = getTimestampOneSecondAgo(Date.now(), 1);
  next();
});

userSchema.pre("find", function (next) {
  console.log("find");
  next();
});

//post钩子注册：
studentSchema.post("init", (doc) => {
  console.log("post-init");
});

studentSchema.post("validate", (doc, next) => {
  console.log("post-validate");
  next();
});

studentSchema.post("save", function (doc, next) {
  console.log("post-save");
  next();
});

studentSchema.post("find", function (doc, next) {
  console.log("post-find");
  next();
});

//模型创建：将模式编译成模型
const Token = mongoose.model("Token", userSchema);

module.exports = Token;

//save方法引起的相关已注册的钩子的执行
// let tokenObj = new Token({
//   name: "測試人員",
//   email: "abc@gmail.com",
//   password: 123456,
//   passwordComfirm: 123456,
// });

// console.log(tokenObj.passwordComfirm);

tokenObj.save((err, doc) => {
  if (err) throw err;
  console.log("1.使用实例save()方法保存成功！");
});

//find方法引起的相关已注册的钩子的执行
tokenObj.find((err, Token) => {
  if (err) throw err;
  console.log("查询所有Token结果如下：");
  console.log(Token.toString());
});
