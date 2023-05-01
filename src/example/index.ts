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

/**
 ?toWallet=0xd5c6A645073828A651b3ff0d4d42E08439D3178d&toCurrency=USDT-MATIC&toAmount=10&merchantOrderId=e7699166-c9d1-4ce1-8198-58c571d26bc1&apiKey=6170fa03-5dcd-42ea-bef6-b3eab64cf6b5&email=teke97%40gmail.com&signature=d082ddc3faf50a35a1ffb718ac21d7775a891df4a90079a5b4409718ec0bc9b7"
 */
const widget = new NearPay({
  mountElement: container,
  environment: 'development',
  params: {
    email: 'teke97@gmail.com',
    toAmount: '10',
    toWallet: '0xd5c6A645073828A651b3ff0d4d42E08439D3178d',
    toCurrency: 'USDT-MATIC',
    merchantOrderId: 'e7699166-c9d1-4ce1-8198-58c571d26bc1',
    apiKey: '6170fa03-5dcd-42ea-bef6-b3eab64cf6b5',
    signature:
      'd082ddc3faf50a35a1ffb718ac21d7775a891df4a90079a5b4409718ec0bc9b7',
  },
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
