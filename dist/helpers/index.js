"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWidgetUrl = exports.makeParamsQuery = void 0;
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
const getWidgetUrl = (environment) => {
    return environment === 'development'
        ? 'https://dev-widget.nearpay.co'
        : 'https://widget.nearpay.co';
};
exports.getWidgetUrl = getWidgetUrl;
