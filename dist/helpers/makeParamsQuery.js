"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeParamsQuery = void 0;
const removeUndefined = (object) => {
    const copy = {};
    Object.keys(object).forEach((key) => {
        if (object[key] !== undefined) {
            copy[key] = object[key];
        }
    });
    return copy;
};
const makeParamsQuery = ({ apiKey, toWallet, toCurrency, toAmount, signature, merchantOrderId, }) => {
    const params = new URLSearchParams(removeUndefined({
        toWallet,
        toCurrency,
        toAmount,
        merchantOrderId,
        apiKey,
        signature,
    })).toString();
    return `${params}`;
};
exports.makeParamsQuery = makeParamsQuery;
