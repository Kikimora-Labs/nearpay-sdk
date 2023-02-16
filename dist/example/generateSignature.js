"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignature = void 0;
const index_1 = require("../index");
// pad string to the left
function padStart(str, length, pad) {
    return pad.repeat(Math.ceil(str.length / length)) + str;
}
function buf2hex(buffer) {
    // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map((x) => padStart(x.toString(16), 2, '0'))
        .join('');
}
function generateSignature(secretKey, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const encoder = new TextEncoder();
        const algo = { name: 'HMAC', hash: 'SHA-256' };
        const key = yield crypto.subtle.importKey('raw', encoder.encode(secretKey), algo, false, ['sign', 'verify']);
        const signature = yield crypto.subtle.sign(algo.name, key, encoder.encode((0, index_1.makeSignatureString)(params)));
        const digest = buf2hex(new Uint8Array(signature));
        return digest;
    });
}
exports.generateSignature = generateSignature;
