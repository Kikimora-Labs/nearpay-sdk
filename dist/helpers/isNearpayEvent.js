"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNearpayEvent = void 0;
function isNearpayEvent(event) {
    return event.data && event.data.source === 'nearpay_widget';
}
exports.isNearpayEvent = isNearpayEvent;
