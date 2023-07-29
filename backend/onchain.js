import "dotenv/config";
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
  process.env.PRIVATE_KEY
);

const contract = new starknet.Contract(erc20Json, eth_address, provider);

export async function transfer(to) {
  console.log(`transfer(${to})`);
  let call = contract.populate("transfer", {
    recipient: to,
    amount: {
      low: process.env.AMOUNT_TRANSFERED,
      high: "0",
    },
  });

  console.log("Call:", call);
  const nonce = await provider.getNonceForAddress(address);
  console.log("Nonce", nonce);
  const version = "0x1";
  const maxFee = "0x11111111111";
  let hash = await account.execute(call, undefined, {
    nonce,
    maxFee,
    version,
  });

  console.log(hash);
  return hash;
}

export async function balanceOf(of) {
  console.log(`balanceOf(${of}):`);
  const balance = await contract.balanceOf(of);
  console.log(starknet.uint256.uint256ToBN(balance.balance).toString());
  return starknet.uint256.uint256ToBN(balance.balance).toString();
}

export async function deployKakarotAccount(evmAddress) {
  const call = {
    contractAddress: process.env.KAKAROT_ADDRESS,
    entrypoint: "deploy_externally_owned_account",
    calldata: [parseInt(evmAddress, 16)],
  };
  const nonce = await provider.getNonceForAddress(address);
  console.log("Nonce - ", nonce);
  const version = "0x1";
  const maxFee = "0x11111111111";
  const hash = await account.execute(call, undefined, {
    nonce,
    maxFee,
    version,
  });
  return hash;
}
