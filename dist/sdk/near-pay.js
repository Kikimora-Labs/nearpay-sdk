"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NearPay = void 0;
const helpers_1 = require("../helpers");
const ERROR_NO_MOUNT_ELEMENT = new Error('[NearPay]: provide mount element');
const DEFAULTS = {
    IFRAME_CLASS: 'NearPay__iframe',
    IFRAME_ID: 'near-pay-iframe',
};
class NearPay {
    constructor({ mountElement, environment = 'production', iframeClass = DEFAULTS.IFRAME_CLASS, iframeId = DEFAULTS.IFRAME_ID, params, }) {
        this.iframe = null;
        this._initialized = false;
        if (!mountElement) {
            throw ERROR_NO_MOUNT_ELEMENT;
        }
        this._iframeClass = iframeClass;
        this._iframeId = iframeId;
        this.mountElement = mountElement;
        this._env = environment;
        this._params = params || null;
    }
    get link() {
        if (!this._params) {
            return (0, helpers_1.getWidgetUrl)(this._env);
        }
        else {
            return `${(0, helpers_1.getWidgetUrl)(this._env)}?${(0, helpers_1.makeParamsQuery)(this._params)}`;
        }
    }
    createIframe() {
        const iframe = document.createElement('iframe');
        iframe.classList.add(this._iframeClass);
        iframe.id = this._iframeId;
        iframe.src = this.link;
        return iframe;
    }
    init() {
        if (this._initialized)
            return;
        const iframe = this.createIframe();
        this.mountElement.appendChild(iframe);
        this.iframe = iframe;
        this._initialized = true;
    }
}
exports.NearPay = NearPay;
