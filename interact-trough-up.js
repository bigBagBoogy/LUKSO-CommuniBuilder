import { LSPFactory } from "./node_modules/@erc725/erc725.js/build/main/src/index.d.ts";

const provider = "https://rpc.testnet.lukso.network";

const lspFactory = new LSPFactory(provider, {
  deployKey: "0x...", // Private key of the account which will deploy smart contracts
  chainId: 2828,
});
console.log("lspFactory");
