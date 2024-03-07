import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import { programs } from "@metaplex/js";
import { ResponseTokenInfo } from "../model/ResponseTokenInfo";

import "dotenv/config";

const connect = new Connection(process.env.HTTP_ENDPOINT as string, {
  commitment: "confirmed",
  wsEndpoint: process.env.WSS_ENDPOINT,
});

const addr = new PublicKey("5gAEr9yJXA6fhnUwfxVeKrgB3dpJhX8FsE6ebcD3FA5U");

export function getBalanceAccount() {
  connect
    .getBalance(addr)
    .then((balance) => {
      console.log(`Balance for ${addr.toBase58()}: ${balance}`);
    })
    .catch((error) => {
      console.error(`Error fetching balance: ${error}`);
    });
}

export const getInfoToken = async(): Promise<ResponseTokenInfo> => {
  const metaplex = Metaplex.make(connect);
  const tokenMetadata = await metaplex
    .nfts()
    .findByMint({
      mintAddress: new PublicKey(
        "5hmf8Jt9puwoqiFQTb3vr22732ZTKYRLRw9Vo7tN3rcz"
      ),
    });
    const resp: ResponseTokenInfo= JSON.parse(JSON.stringify(tokenMetadata));
    return resp;
}
