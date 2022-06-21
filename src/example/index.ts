import {EventType, NearPay, OrderPayload, ResizePayload} from '../index';

const container = document.querySelector(
  '#nearpay-widget-container',
) as HTMLElement;

const widget = new NearPay({
  mountElement: container,
  environment: 'development',
});

const listener = (data: ResizePayload) => {
  console.log('onload', data);
};
const onOrderCreated = (data: OrderPayload) => {
  console.log('order created', data);
};

widget.addListener(EventType.Onload, listener);
widget.addListener(EventType.Onoperationcreated, onOrderCreated);

// unsubsribe
// widget.removeEventListener('onload', listener);
widget.init();
