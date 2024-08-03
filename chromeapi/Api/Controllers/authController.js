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

// 註冊帳號的時候使用 mongoose的 model
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
