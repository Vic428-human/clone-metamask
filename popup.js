document.addEventListener("DOMContentLoaded", function () {
  // 切換帳號
  document
    .getElementById("accountList")
    .addEventListener("click", changeAccount);

  // 複製地址
  document.getElementById("userAddress").addEventListener("click", copyAddress);

  document.getElementById("transferFund").addEventListener("click", handler);

  // 打開切換網路的下拉選單
  document
    .getElementById("hearder_network")
    .addEventListener("click", getOpenNetwork);
  // 點選其中一項網路，點選後，收起下拉選單
  document
    .getElementById("network_item")
    .addEventListener("click", getSelectedNetwork);

  // 設定新的Network
  document.getElementById("add_network").addEventListener("click", setNetwork);

  // 使用者登入
  document.getElementById("loginAccount").addEventListener("click", loginUser);

  // 使用者創建
  document
    .getElementById("accountCreate")
    .addEventListener("click", createUser);

  // 顯示創建帳號的彈出視窗
  document.getElementById("openCreate").addEventListener("click", openCreate);

  // 註冊帳號
  document.getElementById("sign_up").addEventListener("click", signUp);

  // 登入 邏輯
  document.getElementById("login_up").addEventListener("click", login);

  // 登出 邏輯
  document.getElementById("logout").addEventListener("click", logout);

  // 打開轉帳頁面
  document
    .getElementById("open-transfer")
    .addEventListener("click", openTransfer);

  // 轉帳頁面 > 回到首頁
  document.getElementById("goBack").addEventListener("click", goBack);

  // 打開 匯入Token 頁面
  document.getElementById("open_Import").addEventListener("click", openImport);

  // 關閉激活頁面 > 打開資產頁面
  document.getElementById("open_assets").addEventListener("click", openAssets);

  // 關閉資產頁面 > 打開激活頁面
  document
    .getElementById("open_activity")
    .addEventListener("click", openActivity);

  // 從彈窗回到首頁
  document.getElementById("goHomePage").addEventListener("click", goHomePage);

  // 點選匯入帳號按鈕 > 打開匯入帳號介面UI
  document
    .getElementById("openAccountImport")
    .addEventListener("click", openImportModel);

  document.getElementById("open_In").addEventListener("click", openImport);
});

// STATE VARIABLE
let provideURL =
  "https://eth-mainnet.g.alchemy.com/v2/zeAXdZvtVQ4Js5rcyZ7eW77ysa-kL-bz";

// let provider;
let privateKey;
let address;

/*
  FUNCTION
*/

// 轉帳
function handler() {
  // setting our loader
  document.getElementById("transfer_center").style.display = "flex";
  const amount = document.getElementById("amount").value;
  const address = document.getElementById("address").value;
  // private_key & testAccount 不要推到github上，因為有別人的私鑰就能直接進行轉帳
  // 我就是苦主QQ
  const private_key = "";
  const testAccount = "";

  // connect blockchain which is polygon
  const provider = new ethers.provider.JsonRpcProvider(provideURL);
  let wallet = new ethers.Wallet(privateKey, provider);

  const tx = {
    to: address,
    value: ethers.utils.parseEther(amount),
  };

  // see the transaction method
  let a = document.getElementById("link");
  a.href = "somelink url";

  wallet.sendTransaction(tx).then((txObj) => {
    console.log("txHash", txObj.hash);
    document.getElementById("transfer_center").style.display = "none";
    const a = document.getElementById("link");
    document.getElementById("link").style.display = "block";
  });
}

// 檢查餘額
function checkBalance(address) {
  const provider = new ethers.provider.JsonRpcProvider(provideURL);
  provider.getBalence(address).then((balance) => {
    const balanceInEth = ethers.utils.formatEther(balance);

    document.getElementById(
      "accountBlance"
    ).innerHTML = `${balanceInEth} MATIC`;

    document.getElementById("userAddress").innerHTML = `${address.slice(
      0,
      15
    )}`;
  });
}

// 開啟網路模組
function getOpenNetwork() {
  document.getElementById("network").style.display = "block";
}
// 已經被選取的網路
// 此版本不測試 Goerli 網路
function getSelectedNetwork(e) {
  // 被選擇的 網路所在的元素位置
  const element = document.getElementById("selected_network");
  // 下拉選單被點選時，被點選的那一個，顯示在 網路所在的元素位置
  element.innerHTML = e.target.innerHTML;
  if (e.target.innerHTML === "Ethereum Mainnet") {
    // alchemy 上的 Ethereum 主鏈
    provideURL =
      "https://eth-mainnet.g.alchemy.com/v2/zeAXdZvtVQ4Js5rcyZ7eW77ysa-kL-bz";
    document.getElementById("network").style.display = "none";
  } else if (e.target.innerHTML === "Polygon Mainnet") {
    // web3 api endpoint 上的 polygon鏈
    provideURL = "https://rpc.ankr.com/polygon";
    document.getElementById("network").style.display = "none";
  } else if (e.target.innerHTML === "Polygon Amoy") {
    // alchemy 上的 polygon Amoy 測試鏈
    provideURL =
      "https://polygon-amoy.g.alchemy.com/v2/zeAXdZvtVQ4Js5rcyZ7eW77ysa-kL-bz";
    document.getElementById("network").style.display = "none";
  } else if (e.target.innerHTML === "Sepolia Test Network") {
    // web3 api endpoint 上的 eth_sepolia 測試鏈
    provideURL = "https://rpc.ankr.com/eth_sepolia";
    document.getElementById("network").style.display = "none";
  }
}

// 設定新的Network
function setNetwork() {
  document.getElementById("network").style.display = "none";
}

// 使用者登入
function loginUser() {
  document.getElementById("CreateAccount").style.display = "none";
  document.getElementById("LoginUser").style.display = "block";
}

// 使用者創建 UI
function createUser() {
  document.getElementById("CreateAccount").style.display = "block";
  document.getElementById("LoginUser").style.display = "none";
}
// 顯示創建帳號的彈出視窗 UI
function openCreate() {
  document.getElementById("CreateAccount").style.display = "none";
  document.getElementById("createpopUp").style.display = "block";
}

// 註冊帳號 邏輯
function signUp() {
  const name = document.getElementById("sign_up_name").value;
  const email = document.getElementById("sign_up_email").value;
  const password = document.getElementById("sign_up_password").value;
  const passwordConfirm = document.getElementById(
    "sign_up_passwordConfirm"
  ).value;

  document.getElementById("field").style.display = "none";
  document.getElementById("center").style.display = "block";

  const wallet = ethers.wallet.createRandom();

  if (wallet.address) {
    // 產出了錢包地址
    // 可以對 private key 加密，並存儲資訊在database，確認db是100%安全
    console.log(wallet);
    const url = "http://localhost:3000/api/v1/user/signup";
    const data = {
      name: name,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      address: wallet.address,
      private_key: wallet.privateKey,
      mnemonic: wallet.mnemonic.phrase,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        document.getElementById("createAddress").innerHTML = wallet.address;
        document.getElementById("createPrivateKey").innerHTML =
          wallet.privateKey;
        document.getElementById("createMnemonic").innerHTML =
          wallet.mnemonic.phrase;
        document.getElementById("center").style.display = "block";
        document.getElementById("sign_up").style.display = "none";

        const userWallet = {
          address: wallet.address,
          private_key: wallet.privateKey,
          mnemonic: wallet.mnemonic.phrase,
        };

        const jsonObj = JSON.stringify(userWallet);
        localStorage.setItem("userWallet", jsonObj);
        document.getElementById("goHomePage").style.display = "block";
        window.location.reload();
      })
      .catch((error) => console.error(error));
  }
}

// 登入 邏輯
function login() {
  document.getElementById("login_form").style.display = "none";
  document.getElementById("center").style.display = "block";
  const email = document.getElementById("login_email").value;
  const password = document.getElementById("login_password").value;
  const url = "http://localhost:3000/api/v1/user/login";
  const data = {
    email: email,
    password: password,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      const userWallet = {
        address: result.data.user.address,
        private_key: result.data.user.private_key,
        mnemonic: result.data.user.mnemonic,
      };

      const jsonObj = JSON.stringify(userWallet);
      localStorage.setItem("userWallet", jsonObj);
      window.location.reload();
    })
    .catch((error) => console.error(error));
}

// 登出 邏輯
function logout() {
  localStorage.removeItem("userWallet");
  window.location.reload();
}

// 打開轉帳頁面
function openTransfer() {
  document.getElementById("transfer_form").style.display = "block";
  document.getElementById("home").style.display = "none";
}

// 轉帳頁面 > 回到首頁
function goBack() {
  document.getElementById("transfer_form").style.display = "none";
  document.getElementById("home").style.display = "block";
}

// 打開 匯入Token 頁面
function openImport() {
  document.getElementById("import_token").style.display = "block";
  document.getElementById("home").style.display = "none";
}

// 匯入Token 頁面 > 回到首頁
function importGoBack() {
  document.getElementById("import_token").style.display = "none";
  document.getElementById("home").style.display = "block";
}

// 關閉資產頁面 > 打開激活頁面
function openActivity() {
  document.getElementById("activity").style.display = "block";
  document.getElementById("assets").style.display = "none";
}

// 關閉激活頁面 > 打開資產頁面
function openAssets() {
  document.getElementById("activity").style.display = "none";
  document.getElementById("assets").style.display = "block";
}

// 從彈窗回到首頁
function goHomePage() {
  document.getElementById("create_popUp").style.display = "none";
  document.getElementById("home").style.display = "block";
}
// 點選 匯入帳號按鈕 > 打開匯入帳號介面UI
function openImportModel() {
  document.getElementById("import_account").style.display = "block";
  document.getElementById("home").style.display = "none";
}

// 點選 匯入帳號介面UI關閉按鈕 > 回到首頁
function closeImportModel() {
  document.getElementById("import_account").style.display = "none";
  document.getElementById("home").style.display = "block";
}

// 增加新的ERC20 Token 需把該筆資料打到後端DB
function addToken() {
  const address = document.getElementById("token_address").value;
  const name = document.getElementById("name").value;
  const symbol = document.getElementById("symbol").value;

  const url = "http://localhost:3000/api/v1/tokens/createToken";

  const data = {
    name: name,
    address: address,
    symbol: symbol,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("result==>", result);
      window.location.reload();
    })
    .catch((error) => console.error(error));
}

// Token地址與符號列表 / 錢包地址清單與私鑰
function myFunction() {
  const str = localStorage.getItem("userWallet");
  const parsedObj = JSON.parse(str);

  // 錢包地址
  if (parsedObj.address) {
    // https://israynotarray.com/javascript/20230310/4188721863/
    document.getElementById("LoginUser").style.display = "none";
    document.getElementById("home").style.display = "block";
    checkBalance(parsedObj.address); // 查出來的是 native token餘額
  }
  // 可以針對 CSS Selector 來選取元素，所以選取的方式就非常多種
  const tokenRender = document.querySelector(".assets");
  const accountRender = document.querySelector(".accountList");

  // 其餘ERC20Token 對應的token地址跟符號
  const urlAllToken = "http://localhost:3000/api/v1/tokens/allToken";
  // 所有錢包地址，每個帳號有對應的私鑰
  const urlAllaccount = "http://localhost:3000/api/v1/account/allaccount";

  fetch(urlAllToken)
    .then((response) => response.json())
    .then((data) => {
      let elements = "";

      elements = data.data.tokens.map(
        (token) =>
          `<div class="assets_item">
              <img class="assets_item_img" src="./assets/theblockchaincoders.png" alt="assets_item_img" height="600">
              <span class="">${token.address.slice(0, 15)}</span>
              <span class="">${token.symbol}</span>
          </div>`
      );
      tokenRender.innerHTML = elements;
    })
    .catch((error) => console.error(error));

  fetch(urlAllaccount)
    .then((response) => response.json())
    .then((data) => {
      let accounts = "";

      // TODO: data-privateKey 直接寫在] data-* 會有被竊取的風險，所以這邊還是需要進行加密
      accounts = data.data.tokens.map(
        (account, i) =>
          `<div class="assets_item">
              <p class="">${i + 1}</p>
              <p class="accountValue" data-address=${
                account.address
              } data-privateKey=${account.privateKey}>${account.address.slice(
            0,
            25
          )}...</p>
          </div>`
      );
      accountRender.innerHTML = accounts;
    })
    .catch((error) => console.error(error));
}

// 複製地址
function copyAddress() {
  navigator.clipboard.writeText(address);
}

// 切換帳號
function changeAccount() {
  const data = document.querySelector('.accountValue');
  const address = data.getAttribute('data-address');
  const privateKey = data.getAttribute('data-privateKey');
  const userWallet = {
    address: address,
    private_key: privateKey,
    mnemonic: "Changed",
  };
  const jsonObj = JSON.stringify(userWallet);
  localStorage.setItem("userWallet", jsonObj);
  window.location.reload();
}

window.onload() = myFunction;
