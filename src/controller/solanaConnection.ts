import {
  Connection,
  GetProgramAccountsResponse,
  PublicKey,
  RpcResponseAndContext,
  TokenAmount
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Metaplex, TokenAccount } from "@metaplex-foundation/js";
import { programs } from "@metaplex/js";
import { DataDetailToken, ResponseTokenInfo } from "../model/ResponseTokenInfo";

import "dotenv/config";

const connect = new Connection(process.env.HTTP_ENDPOINT as string, {
  commitment: "confirmed",
  wsEndpoint: process.env.WSS_ENDPOINT,
});

const addr = new PublicKey("5gAEr9yJXA6fhnUwfxVeKrgB3dpJhX8FsE6ebcD3FA5U");

//calltoken
const callToken = new PublicKey("5hmf8Jt9puwoqiFQTb3vr22732ZTKYRLRw9Vo7tN3rcz");

// export function getBalanceAccount() {
//   connect
//     .getBalance(addr)
//     .then((balance) => {
//       console.log(`Balance for ${addr.toBase58()}: ${balance}`);
//     })
//     .catch((error) => {
//       console.error(`Error fetching balance: ${error}`);
//     });
// }

export const getInfoToken = async (): Promise<DataDetailToken> => {
  const metaplex = Metaplex.make(connect);
  const totalSupply: RpcResponseAndContext<TokenAmount> =
    await connect.getTokenSupply(
      callToken
    );
  const tokenMetadata = await metaplex.nfts().findByMint({
    mintAddress: callToken
  });
  const amountTotalSuply = parseFloat(totalSupply.value.amount);
  const detailsToken:ResponseTokenInfo = JSON.parse(JSON.stringify(tokenMetadata));
  const decimal = "1e"+detailsToken.mint.decimals;
  const accountInfo = await connect.getAccountInfo(callToken);
await  metaplex.nfts().findAllByOwner({
  owner: metaplex.identity().publicKey
}).then(e=>{
  console.log(e)
})
  // const tokenAccounts = await connect.getTokenAccountsByOwner(callToken, { programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") });
  const tokenAccounts: any = await connect.getTokenAccountsByOwner(
    callToken,
    { programId: TOKEN_PROGRAM_ID }
  );
  // console.log(tokenAccounts)
  const holders: string[] = tokenAccounts.value.map((account: TokenAccount) => account.owner.toBase58());


  // console.log(accountInfo)
  // console.log(holders)
  // const circulatingSupply = tokenAccounts.reduce((total, account) => {
  //   return total + account.account.data.parsed.info.tokenAmount.amount;
  // }, 0);


  const response: DataDetailToken = {
    totalSupply: (amountTotalSuply  / parseFloat(decimal)).toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 6 }),
    totalHolder: "",
    circSupply: "",
    detailToken: detailsToken,
  };
  // const resp: ResponseTokenInfo= JSON.parse(JSON.stringify(tokenMetadata));
  return response;
};

// async function getCirculatingSupply(connection:Connection) {
//   try {

//     // Get token accounts by owner (all accounts associated with the token mint)
//     const tokenAccounts = await connection.getTokenAccountsByOwner(tokenMintAddress, { programId: Token.PROGRAM_ID });

//     // Calculate circulating supply based on owned token accounts
//     const circulatingSupply = tokenAccounts.reduce((total, account) => {
//       return total + account.account.data.parsed.info.tokenAmount.amount;
//     }, 0);

//     console.log('Circulating Supply:', circulatingSupply);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
