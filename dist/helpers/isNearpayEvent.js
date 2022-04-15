"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onNearpayEvent = exports.isNearpayEvent = void 0;
const global_1 = require("./global");
function isNearpayEvent(event) {
    return event.data && event.data.source === 'nearpay_widget';
}
exports.isNearpayEvent = isNearpayEvent;
const listeners = {};
const window = (0, global_1.getWindow)();
if (window) {
    window.addEventListener('message', (event) => {
        if (isNearpayEvent(event)) {
            const callbacks = listeners[event.data.data.type];
            if (callbacks) {
                callbacks.forEach(cb => cb(event.data.data.payload));
            }
        }
    });
}
function onNearpayEvent(type, listener) {
    if (!listeners[type]) {
        listeners[type] = [];
    }
    listeners[type].push(listener);
}
exports.onNearpayEvent = onNearpayEvent;
