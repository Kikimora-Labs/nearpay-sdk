"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignatureString = void 0;
/**
 * @param params Pass your merchant parameters without `signature`
 * @returns `string` which you should hash using your `secret_key`
 */
function makeSignatureString(params) {
    return Object.keys(params)
        .sort()
        .map((key) => `${key}:${params[key]}`)
        .join('');
}
exports.makeSignatureString = makeSignatureString;
