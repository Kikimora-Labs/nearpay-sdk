import {NearPay, ResizePayload, OrderPayload} from '../index';

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

widget.addListener('onload', listener);
widget.addListener('onoperationcreated', onOrderCreated);

// unsubsribe
// widget.removeEventListener('onload', listener);
widget.init();
