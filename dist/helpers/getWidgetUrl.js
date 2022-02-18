"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWidgetUrl = void 0;
const getWidgetUrl = (environment) => {
    return environment === 'development'
        ? 'https://dev-widget.nearpay.co'
        : 'https://widget.nearpay.co';
};
exports.getWidgetUrl = getWidgetUrl;
