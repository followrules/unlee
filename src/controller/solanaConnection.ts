import {
  Connection,
  PublicKey,
  RpcResponseAndContext,
  TokenAccountBalancePair,
  TokenAmount,
} from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

import {
  DataDetailToken,
  ResponseTokenInfo,
  TopHolders,
} from "../model/ResponseTokenInfo";

import "dotenv/config";
import { InformationTokens } from "../model/InformationToken";
import { getApiPairInfo } from "./apiTokensPairInfo";
import { ResponsePair } from "../model/ResponsePair";


export const getInfoToken = async (callToken: PublicKey,connect:Connection): Promise<DataDetailToken> => {
  const metaplex = Metaplex.make(connect);
  const totalSupply: RpcResponseAndContext<TokenAmount> =
    await connect.getTokenSupply(callToken);
  const tokenMetadata = await metaplex.nfts().findByMint({
    mintAddress: callToken,
  });
  const amountTotalSuply = parseFloat(totalSupply.value.amount);
  const detailsToken: ResponseTokenInfo = JSON.parse(
    JSON.stringify(tokenMetadata)
  );
  const decimal = "1e" + detailsToken.mint.decimals;
  const tokenHolders = await connect.getTokenLargestAccounts(callToken);
  const holders: TopHolders[] = tokenHolders.value.map(
    (e: TokenAccountBalancePair) => ({
      address: e.address.toString(),
      percentage: "",
      total_amount: (parseFloat(e.amount) / parseFloat(decimal)).toLocaleString(
        undefined,
        { minimumFractionDigits: 6, maximumFractionDigits: 6 }
      ),
    })
  );

  const response: DataDetailToken = {
    totalSupply: (amountTotalSuply / parseFloat(decimal)).toLocaleString(
      undefined,
      { minimumFractionDigits: 6, maximumFractionDigits: 6 }
    ),
    totalHolder: "",
    circSupply: "",
    detailToken: detailsToken,
    topHolders: holders,
  };

  return response;
};

//Call Api
export const getInfoTokenPairs = async (tokens: PublicKey,connect: Connection): Promise<InformationTokens> => {
  const detailsToken:DataDetailToken = await getInfoToken(tokens,connect);
  const apiData:ResponsePair = await getApiPairInfo(tokens.toBase58());
  const buildResponse: InformationTokens = {
    name: detailsToken.detailToken.name,
    tokens:detailsToken.detailToken.address,
    isMutable: detailsToken.detailToken.isMutable,
    symbols: detailsToken.detailToken.symbol,
    expoler: "https://solscan.io/token/"+detailsToken.detailToken.address,
    sellerFee: detailsToken.detailToken.sellerFeeBasisPoints,
    total_supply: detailsToken.totalSupply,
    social_media: detailsToken.detailToken.json?.extensions,
    top_holder: detailsToken.topHolders,
    pairs: apiData.pairs.map((e)=>({
      dexId:e.dexId,
      priceUsd: parseFloat(e.priceUsd),
      fdv:e.fdv.toLocaleString(),
      liquidity:e.liquidity.usd.toLocaleString(),
      pairAddress:"https://dexscreener.com/solana/"+e.pairAddress
    }))
  };
  return buildResponse;
};
