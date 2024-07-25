import { ethers } from "ethers";
import { ERC20_ABI } from "./ABI";

let provideURL =
  "https://eth-mainnet.g.alchemy.com/v2/zeAXdZvtVQ4Js5rcyZ7eW77ysa-kL-bz";
const provider = new ethers.provider.JsonRpcProvider(provideURL);

// 由使用者提供匯入
const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const erc20 = new ethers.Contract(address, ERC20_ABI, provider);

const ethersScript = async () => {
  // EX: DAI 的 decimals 为 18，表示 1 个 DAI 等于 1,000,000,000,000,000,000 (wei)
  // 被匯入的穩定幣位數
  const decimals = await erc20.decimals();
  // 被匯入的穩定幣符號
  const symbol = await erc20.symbol();
  // 使用者錢包地址所持有該 匯入的穩定幣的 數量
  const balanceOf = await erc20.balanceOf(
    "0x9d4eF81F5225107049ba08F69F598D97B31ea644"
  );
  //the result for erc20.total supply will be a big number,
  // so we formatted it using ethers.formatUnits method
  const totalSupply = ethers.formatUnits(await erc20.totalSupply());

  console.log(`The Decimal Count of ${address} is: ${decimals}`);
  console.log(`The Symbol of ${address} is: ${symbol}`);
  console.log(`The Total Supply of ${address} is: ${supply}`);
  console.log(
    `The Balance of 0x9d4eF81F5225107049ba08F69F598D97B31ea644 is: ${balance} ${symbol}`
  );
};
ethersScript();
