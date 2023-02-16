"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const container = document.querySelector('#nearpay-widget-container');
const params = {};
const widget = new index_1.NearPay({
    mountElement: container,
    environment: 'stage',
});
const listener = (data) => {
    console.log('onload', data);
};
const onOrderCreated = (data) => {
    console.log('order created', data);
};
widget.addListener(index_1.EventType.Onload, listener);
widget.addListener(index_1.EventType.Onoperationcreated, onOrderCreated);
widget.addListener('*', (data) => {
    console.log('all events', data);
});
// unsubsribe
// widget.removeEventListener('onload', listener);
widget.init();
