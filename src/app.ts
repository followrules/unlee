import {getBalanceAccount, getInfoToken, } from "./controller/solanaConnection";
import { ResponseTokenInfo } from "./model/ResponseTokenInfo";


async function init() {
    const fafa: ResponseTokenInfo = await getInfoToken();
    console.log(fafa)
};

init();