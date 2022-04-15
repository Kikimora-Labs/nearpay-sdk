"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NearPay = void 0;
const helpers_1 = require("../helpers");
const global_1 = require("../helpers/global");
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
        this._listeners = {};
    }
    startWindowHandling() {
        const window = (0, global_1.getWindow)();
        if (window) {
            window.addEventListener('message', (event) => {
                if ((0, helpers_1.isNearpayEvent)(event)) {
                    const callbacks = this._listeners[event.data.data.type];
                    if (callbacks) {
                        Array.from(callbacks).forEach(cb => cb(event.data.data.payload));
                    }
                }
            });
        }
    }
    createIframe() {
        const iframe = document.createElement('iframe');
        iframe.classList.add(this._iframeClass);
        iframe.id = this._iframeId;
        iframe.src = (0, helpers_1.getWidgetUrl)(this._env, this._params || undefined);
        return iframe;
    }
    init() {
        if (this._initialized)
            return;
        this.startWindowHandling();
        const iframe = this.createIframe();
        this.mountElement.appendChild(iframe);
        this.iframe = iframe;
        this._initialized = true;
    }
    addListener(type, listener) {
        if (!this._listeners[type]) {
            this._listeners[type] = new Set();
        }
        this._listeners[type].add(listener);
    }
    removeListener(type, listener) {
        if (!this._listeners[type]) {
            return;
        }
        this._listeners[type].delete(listener);
    }
}
exports.NearPay = NearPay;
