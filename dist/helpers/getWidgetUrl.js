"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWidgetUrl = void 0;
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
/**
 *
 * @param environment switch between production/development versions of widget
 *
 * @returns `url` - ready to be inserted into `iframe.src` attribute
 */
const getWidgetUrl = (environment, params) => {
    const origin = environment === 'development'
        ? 'https://dev-widget.nearpay.co'
        : 'https://widget.nearpay.co';
    if (!params) {
        return origin;
    }
    else {
        return `${origin}?${makeParamsQuery(params)}`;
    }
};
exports.getWidgetUrl = getWidgetUrl;
