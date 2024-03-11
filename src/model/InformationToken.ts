export interface InformationTokens {
  name?: string;
  symbols?: string;
  total_supply?: string;
  isMutable?: boolean;
  social_media?: any;
  expoler?: string;
  top_holder?: any[];
  tokens?: string;
  pairs?: pairs[];
  sellerFee?: any;
}


export interface pairs{
  dexId: string,
  priceUsd: number,
  pairAddress:string,
  fdv:string,
  liquidity: string
}