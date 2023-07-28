import * as starknet from "starknet";
import erc20Json from "./erc20_abi.json" assert { type: "json" };

const eth_address = process.env.TOKEN_ADDRESS;
const address = process.env.STARKNET_ACCOUNT_ADDRESS;

const provider = new starknet.RpcProvider({
  nodeUrl: process.env.RPC_URL,
});

const account = new starknet.Account(
  provider,
  address,
  process.env.PRIVATE_KEY,
);

const contract = new starknet.Contract(erc20Json, eth_address, provider);

export async function transfer(to) {
  console.log("Transfer to - ", to);
  let result = contract.populate("transfer", {
    recipient: to,
    amount: {
      low: process.env.AMOUNT_TRANSFERED,
      high: "0",
    },
  });

  console.log("Call detail - ", result);
  const nonce = await provider.getNonceForAddress(address);
  console.log("Nonce - ", nonce);
  const version = "0x1";
  const maxFee = "0x11111111111";
  let hash = await account.execute(result, undefined, {
    nonce,
    maxFee,
    version,
  });

  console.log(hash);
  return hash;
}

export async function balanceOf(of) {
  console.log("Getting balance of: " + of);
  const balance = await contract.balanceOf(of);
  console.log(
    "Balance -" + starknet.uint256.uint256ToBN(balance.balance).toString(),
  );
  return starknet.uint256.uint256ToBN(balance.balance).toString();
}
