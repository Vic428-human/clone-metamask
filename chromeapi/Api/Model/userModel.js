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

  this.passwordChangedAt = getTimestampOneSecondAgo(Date.now(), 1);
  next();
});

// 只顯示其中 active 為 true  的用戶
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// candidatePassword：用户输入的待验证密码。
// userPassword：存储在数据库中的已加密密码。
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// 用於判断用户是否在特定时间点之后更改了密码
// 方法用于检查存储在 JWT 中的时间戳是否早于密码最后一次更改的时间
// 如果是，代表密碼已經有更改過
// -----範例-----
// const JWTTimestamp = 1690963200; // 2023-08-02T00:00:00Z

// const user = new User({
//   email: 'example@example.com',
//   password: 'password123',
//   passwordChangedAt: new Date('2023-08-01T12:00:00Z') // 密码最后更改时间
// });

// 获取时间戳 > 转换为秒 > 解析为整数
// changedTimestamp = 的值将是 1690891200。
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // changedTimestamp = 169089120 , JWTTimestamp = 1690963200
  // JWTTimestamp > changedTimestamp ( 還沒過期，所以還沒改密碼 )
  return false;
};

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
const User = mongoose.model("User", userSchema);

module.exports = User;

//save方法引起的相关已注册的钩子的执行
// let userObj = new User({
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
