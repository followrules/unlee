import {getBalanceAccount, getInfoToken, } from "./controller/solanaConnection";
import { DataDetailToken } from "./model/ResponseTokenInfo";

/**
 * wen moon
 */

async function init() {
    const fafa: DataDetailToken = await getInfoToken();
    console.log(JSON.stringify(fafa))
};

init();