"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWindow = void 0;
function getWindow() {
    if (typeof window !== 'undefined') {
        return window;
    }
    return;
}
exports.getWindow = getWindow;
