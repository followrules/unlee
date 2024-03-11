import axios, { AxiosResponse } from "axios";
import { customHeaders } from "../utils/agents";
import { ResponsePair } from "../model/ResponsePair";

const HOST: string = process.env.DEXSCREEN_API as string;

export const getApiPairInfo = async (tokens: string): Promise<ResponsePair> => {
  const apiUrl = HOST +"tokens/"+ tokens;
  const callApi: AxiosResponse = await axios.get(apiUrl, {
    headers: customHeaders,
  });
  const dataResponse: ResponsePair = {
    pairs: callApi.data.pairs,
    schemaVersion: callApi.data.schemaVersion,
  };
  return dataResponse;
};
