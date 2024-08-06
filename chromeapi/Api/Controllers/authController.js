const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
const Token = require("../Model/tokenModel");
const Account = require("../Model/accountModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// 註冊的當下把資訊存在cookie裡
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  // 根據 express 的官方文件，能透過res.cookie方法，在路由新增cookie
  // res.cookie(name, value [, options])
  // name：cookie的名稱 / value：cookie的值 / cookie的效期，格式為日期。預設為0
  // 是否拒絕讓javascript取得cookie (不能使用document.cookie，以避免被XSS攻擊
  // 是否能讓未加密網站取得cookie (只能以HTTPS開頭取得cookies)
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// 註冊與登入都會使用到mongoose的model，且成功時都會把jwt info存在cookie
exports.signUp = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordComfirm: req.body.passwordConfirm,
    address: req.body.address,
    private_key: req.body.private_key,
    mnemonic: req.body.mnemonic,
  });
  createSendToken(newUser, 201, req, res);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1) email 或 密碼其中一個不存在時
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password!",
    });
  }

  // 檢查用戶是否存在並且密碼是否正確
  // find each User with a email matching &&
  // selecting the `+password` fields
  const user = await User.findOne({ email }).select("+password");

  // 使用這不存在
  // 或 密碼與mongodb的使用者密碼不一致
  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401).json({
      status: "fail",
      message: "Incorrect email or password",
    });
    createSendToken(user, 200, req, res);
  }
};

/**
 * 
 * 
  // 定義Mongoose模型
  const MyModel = mongoose.model('MyModel', new mongoose.Schema({
    name: String,
    age: Number,
    friends: [String]
  }));

  //假設數據
  const fakeData = [
    { name: "john", age: 25, friends: ["jane", "joe"] },
    { name: "johnny", age: 30, friends: ["jim", "jack"] },
    { name: 'jack', age: 28, friends: ['john'] },
  ];

  // 查找名字類似 john 的文檔並選擇 "name" 和 "friends" 字段
  const johnLikeDocs = await MyModel.find(
    { name: /john/i },
    "name friends"
  ).exec();

  johnLikeDocs 結果 ==>  [
  { _id: 60f8d0c8e25b4c2f441a8e55, name: 'john', friends: [ 'jane', 'joe' ] },
  { _id: 60f8d0c8e25b4c2f441a8e57, name: 'johnny', friends: [ 'jim', 'jack' ] },
]
 */

exports.allToken = async (req, res, next) => {
  // find all documents
  // await MyModel.find({});
  const tokens = await Token.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    data: {
      tokens,
    },
  });
};
