"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const container = document.querySelector('#nearpay-widget-container');
const widget = new index_1.NearPay({
    mountElement: container,
    environment: 'development',
});
const listener = (event) => {
    console.log('onload', event);
};
const onOrderCreated = (event) => {
    console.log('order created', event);
};
widget.addListener(index_1.EventType.Onload, listener);
widget.addListener(index_1.EventType.Onoperationcreated, onOrderCreated);
// You can use inline listener for automatic type inference
widget.addListener(index_1.EventType.Onoperationsuccess, (event) => {
    console.log('order success', event.payload.orderId);
});
widget.addListener(index_1.EventType.Onmerchantorderidexists, (event) => {
    console.log('merchantOrderId exists', event.payload);
});
const allEventsListener = (data) => {
    console.log('all events', data);
};
widget.addListener(index_1.EventType.Any, allEventsListener);
// unsubsribe
// widget.removeEventListener('onload', listener);
widget.init();
