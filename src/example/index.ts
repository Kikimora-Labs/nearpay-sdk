import {
  EventType,
  NearPay,
  OnLoadedEvent,
  OnOperationCreated,
  WidgetEvent,
} from '../index';

const container = document.querySelector(
  '#nearpay-widget-container',
) as HTMLElement;

const widget = new NearPay({
  mountElement: container,
  environment: 'stage',
});

const listener = (event: OnLoadedEvent) => {
  console.log('onload', event);
};
const onOrderCreated = (event: OnOperationCreated) => {
  console.log('order created', event);
};

widget.addListener(EventType.Onload, listener);
widget.addListener(EventType.Onoperationcreated, onOrderCreated);

// You can use inline listener for automatic type inference
widget.addListener(EventType.Onoperationsuccess, (event) => {
  console.log('order success', event.payload.orderId);
});

const allEventsListener = (data: WidgetEvent) => {
  console.log('all events', data);
};
widget.addListener(EventType.Any, allEventsListener);
// unsubsribe
// widget.removeEventListener('onload', listener);
widget.init();
