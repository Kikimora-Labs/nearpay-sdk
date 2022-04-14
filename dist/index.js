"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWidgetUrl = exports.isNearpayEvent = exports.NearPay = exports.makeSignatureString = void 0;
__exportStar(require("./events"), exports);
__exportStar(require("./interfaces/widget-parameters"), exports);
var makeSignatureString_1 = require("./helpers/makeSignatureString");
Object.defineProperty(exports, "makeSignatureString", { enumerable: true, get: function () { return makeSignatureString_1.makeSignatureString; } });
var near_pay_1 = require("./sdk/near-pay");
Object.defineProperty(exports, "NearPay", { enumerable: true, get: function () { return near_pay_1.NearPay; } });
var isNearpayEvent_1 = require("./helpers/isNearpayEvent");
Object.defineProperty(exports, "isNearpayEvent", { enumerable: true, get: function () { return isNearpayEvent_1.isNearpayEvent; } });
var getWidgetUrl_1 = require("./helpers/getWidgetUrl");
Object.defineProperty(exports, "getWidgetUrl", { enumerable: true, get: function () { return getWidgetUrl_1.getWidgetUrl; } });
