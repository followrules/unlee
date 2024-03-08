import {getInfoToken, } from "./controller/solanaConnection";
import { DataDetailToken } from "./model/ResponseTokenInfo";

/**
 * wen moon
 */

async function init() {
    await getInfoToken();
};

init();