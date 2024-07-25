import React, { useState } from "react";
import { ethers } from "ethers";
import { ERC20_ABI } from "./ABI"; // 假設 ABI 文件已經導入

const MyERC20Component = () => {
  const [_contractAddress, setContractAddress] = useState("");
  const [decimals, setDecimals] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [balanceOf, setBalanceOf] = useState("");
  const [userAddress, setUserAddress] = useState(
    "0x9d4eF81F5225107049ba08F69F598D97B31ea644"
  );

  const provideURL =
    "https://eth-mainnet.g.alchemy.com/v2/zeAXdZvtVQ4Js5rcyZ7eW77ysa-kL-bz";
  const provider = new ethers.providers.JsonRpcProvider(provideURL);

  const fetchTokenInfo = async () => {
    try {
      const erc20Contract = new ethers.Contract(
        _contractAddress,
        ERC20_ABI,
        provider
      );
      // 被匯入的穩定幣位數
      const _decimals = await erc20Contract.decimals();
      // 被匯入的穩定幣符號
      const _symbol = await erc20Contract.symbol();
      // 穩定幣合約地址所持有該穩定幣的 數量
      const _totalSupply = ethers.utils.formatUnits(
        await erc20Contract.totalSupply(),
        _decimals
      );
      // 使用者錢包地址所持有該 匯入的穩定幣的 數量
      const _balanceOf = ethers.utils.formatUnits(
        await erc20Contract.balanceOf(userAddress),
        _decimals
      );

      // TODO:
      //主要把 合約地址存起來，之後DB會有多個 tokens，然後後續對顯示ERC20 token清單的時候
      //透過 get getTokenList =>
      //const url = "http://localhost:3000/api/v1/tokens/getTokenList";
      // loop 剛才所有token Contract address，再透過每一個合約地址找回當下的餘額

      const data = {
        name: _symbol,
        contractAddress: _contractAddress,
        symbol: _symbol,
      };

      const url = "http://localhost:3000/api/v1/tokens/createToken";

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

      setDecimals(_decimals);
      setSymbol(_symbol);
      setTotalSupply(_totalSupply);
      setBalanceOf(_balanceOf);
    } catch (error) {
      console.error("Error fetching token info:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="輸入 ERC20 合約地址"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <button onClick={fetchTokenInfo}>加入新的Token</button>
      <p>Decimals: {decimals}</p>
      <p>Symbol: {symbol}</p>
      <p>Total Supply: {totalSupply}</p>
      <p>
        Balance of 0x9d4eF81F5225107049ba08F69F598D97B31ea644: {balanceOf}{" "}
        {symbol}
      </p>
    </div>
  );
};

export default MyERC20Component;
