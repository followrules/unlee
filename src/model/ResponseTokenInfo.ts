export interface DataDetailToken{
    detailToken: ResponseTokenInfo,
    totalSupply?: string,
    circSupply?: string,
    totalHolder?: string
}

export interface ResponseTokenInfo {
  model?: string;
  updateAuthorityAddress?: string;
  json?: JSON;
  jsonLoaded?: boolean;
  name?: string;
  symbol?: string;
  uri?: string;
  isMutable?: boolean;
  primarySaleHappened?: boolean;
  sellerFeeBasisPoints?: number;
  editionNonce?: number;
  creators?: CreatorElement[];
  tokenStandard?: number;
  collection?: null;
  collectionDetails?: null;
  uses?: null;
  programmableConfig?: null;
  address?: string;
  metadataAddress?: string;
  mint: Mint;
}

export interface CreatorElement {
  address?: string;
  verified?: boolean;
  share?: number;
}

export interface JSON {
  name?: string;
  symbol?: string;
  description?: string;
  image?: string;
  creator?: JSONCreator;
  extensions?: Extensions;
}

export interface JSONCreator {
  name?: string;
  site?: string;
}

export interface Extensions {
  telegram?: string;
  twitter?: string;
  website?: string;
}

export interface Mint {
  model?: string;
  address?: string;
  mintAuthorityAddress?: null;
  freezeAuthorityAddress?: null;
  decimals: number;
  supply?: Supply;
  isWrappedSol?: boolean;
  currency?: Currency;
}

export interface Currency {
  symbol?: string;
  decimals?: number;
  namespace?: string;
}

export interface Supply {
  basisPoints?: string;
  currency?: Currency;
}
