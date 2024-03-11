import { PublicKey } from "@metaplex-foundation/js";
import { getInfoTokenPairs } from "./controller/solanaConnection";
import { Connection } from "@solana/web3.js";
import "dotenv/config";
/**
 * wen moon
 */


const connect = new Connection(process.env.HTTP_ENDPOINT as string, {
    commitment: "confirmed",
    wsEndpoint: process.env.WSS_ENDPOINT,
  });

// async function init() {
//   var tokens =  new PublicKey("5hmf8Jt9puwoqiFQTb3vr22732ZTKYRLRw9Vo7tN3rcz");
  
//   var x = await getInfoTokenPairs(tokens,connect);
//   console.log(x);
// }


async function main(connection:Connection, programAddress:any) {
    console.log("Monitoring logs for program:", programAddress.toString());
    connection.onLogs(
        programAddress,
        ({ logs, err, signature }) => {
            if (err) return;

            if (logs && logs.some(log => log.includes("initialize2"))) {
                console.log("Signature for 'initialize2':", signature);
                fetchRaydiumAccounts(signature, connection);
            }
        },
        "finalized"
    );
}


async function fetchRaydiumAccounts(txId:any, connection:any) {
    var credits:any;
    const tx = await connection.getParsedTransaction(
        txId,
        {
            maxSupportedTransactionVersion: 0,
            commitment: 'confirmed'
        });
    
    credits += 100;
    
    const accounts = tx?.transaction.message.instructions.find((ix:any) => ix.programId.toBase58() === process.env.RAYDIUM_POOL).accounts;

    if (!accounts) {
        console.log("No accounts found in the transaction.");
        return;
    }

    const tokenAIndex = 8;
    const tokenBIndex = 9;

    const tokenAAccount = accounts[tokenAIndex];
    const tokenBAccount = accounts[tokenBIndex];

    const displayData = [
        { "Token": "A", "Account Public Key": tokenAAccount.toBase58() },
        { "Token": "B", "Account Public Key": tokenBAccount.toBase58() }
    ];
    console.log("New LP Found");
    console.table(displayData);
    console.log("Total QuickNode Credits Used in this session:", credits);
}




main(connect,process.env.RAYDIUM_POOL);
