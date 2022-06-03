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
const getOrigin = (environment) => {
    switch (environment) {
        case 'production':
            return 'https://widget.nearpay.co';
        case 'development':
            return 'https://dev-widget.nearpay.co';
        case 'stage':
            return 'https://stage-widget.nearpay.co';
        default:
            throw new Error('Environment mode is not defined');
    }
};
/**
 *
 * @param environment switch between production/development versions of widget
 *
 * @returns `url` - ready to be inserted into `iframe.src` attribute
 */
const getWidgetUrl = (environment, params) => {
    const origin = getOrigin(environment);
    if (!params) {
        return origin;
    }
    else {
        return `${origin}?${makeParamsQuery(params)}`;
    }
};
exports.getWidgetUrl = getWidgetUrl;
