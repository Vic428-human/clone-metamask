// import { ethers } from "ethers";
const { ethers } = require("ethers");

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("accountList")
    .addEventListener("click", changeAccount);

  document.getElementById("userAddress").addEventListener("click", copyAddress);

  document.getElementById("transferFund").addEventListener("click", handler);

  document
    .getElementById("hearder_network")
    .addEventListener("click", getOpenNetwork);

  document
    .getElementById("network_item")
    .addEventListener("click", getSelectedNetwork);

  document.getElementById("add_network").addEventListener("click", setNetwork);

  document.getElementById("loginAccount").addEventListener("click", loginUser);

  document
    .getElementById("accountCreate")
    .addEventListener("click", createUser);

  document.getElementById("openCreate").addEventListener("click", openCreate);

  document.getElementById("sign_up").addEventListener("click", signUp);

  document.getElementById("login_up").addEventListener("click", login);

  document.getElementById("logout").addEventListener("click", logout);

  document
    .getElementById("open-transfer")
    .addEventListener("click", openTransfer);

  document.getElementById("goBack").addEventListener("click", goBack);

  document.getElementById("open_Import").addEventListener("click", openImport);

  document.getElementById("open_assets").addEventListener("click", openAssets);

  document
    .getElementById("open_activity")
    .addEventListener("click", openActivity);

  document.getElementById("goHomePage").addEventListener("click", goHomePage);

  document
    .getElementById("openAccountImport")
    .addEventListener("click", openImportModel);

  document.getElementById("open_In").addEventListener("click", openImport);
});

let provideURL =
  "https://eth-sepolia.g.alchemy.com/v2/zeAXdZvtVQ4Js5rcyZ7eW77ysa-kL-bz";

// let provider;
let privateKey;
let address;

function handler() {
  // setting our loader
  document.getElementById("transfer_center").style.display = "flex";
  const amount = document.getElementById("amount").value;
  const address = document.getElementById("address").value;
  // private_key & testAccount 不要推到github上
  const private_key =
    "5cbe1fac3378152c9f2c1351729eeeaf2b743797b50090c44f59df52baccafdf";
  const testAccount = "0xd295b30Fe91b63dacB38b64e03855F4e2B090fdf";
  // ether package global object
  // PROVIDER
  const provider = new ethers.provider.JsonRpcProvider(provideURL);
  let wallet = new ethers.Wallet(privateKey, provider);
}

function checkBalance() {}

function getOpenNetwork() {}

function getSelectedNetwork() {}

function setNetwork() {}

function loginUser() {}

function createUser() {}

function openCreateUser() {}

function openCreate() {}

function signUp() {}

function login() {}

function logout() {}

function openTransfer() {}

function goBack() {}

function openImport() {}

function openImportModel() {}

function importGoBack() {}

function openActivity() {}

function openAssets() {}

function goHomePage() {}

function closeImportModel() {}

function addToken() {}

function myFunction() {}

function copyAddress() {}

function changeAccount() {}
