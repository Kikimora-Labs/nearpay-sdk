export type EventType =
  | 'onload'
  | 'onerror'
  | 'onresize'
  | 'onexit'
  | 'onstarted'
  | 'onoperationcreated'
  | 'onpaymentsent'
  | 'onoperationsuccess'
  | 'onoperationfail'
  | 'onoperationpending';

export interface WidgetEvent<T = EventPayload> {
  type: EventType;
  payload: T;
}

export interface ResizePayload {
  size: {width: number; height: number};
}
export interface ErrorPayload {
  error: {
    code: string;
    message: string;
  };
}
// TODO: think what else should be there
export interface OrderPayload {
  orderId?: string;
  merchantOrderId?: string;
}

export type EventPayload = ResizePayload | ErrorPayload | OrderPayload | null;

// 1) onloaded - Widget succesfully initalized, and ready to be interacted with
export interface OnLoadedEvent extends WidgetEvent<ResizePayload> {
  type: 'onload';
}

// 2) onerror - An error in the work of the widget, which does not allow the process to continue
export interface OnErrorEvent extends WidgetEvent<ErrorPayload> {
  type: 'onerror';
}

// 3) onresize - Resizing the document inside the iframe widget
export interface OnResizeEvent extends WidgetEvent<ResizePayload> {
  type: 'onresize';
}

// 4) onexit - Close the widget, contains no data
export interface OnExitEvent extends WidgetEvent<null> {
  type: 'onexit';
}

// 5) onstarted - The widget started from the starting point (called at each reset to the beginning)
export interface OnStartedEvent extends WidgetEvent<null> {
  type: 'onstarted';
}

// 6) onoperationcreated - user had been authenticated and order had been created
export interface OnOperationCreated extends WidgetEvent<OrderPayload> {
  type: 'onoperationcreated';
}

// 7) onpaymentsent - Sending payment data - the user clicked on Pay, does not contain data
export interface OnPaymentSent extends WidgetEvent<OrderPayload> {
  type: 'onpaymentsent';
}

// 8) onoperationpending - payment is pending to be confirmed
export interface OnOperationPending extends WidgetEvent<OrderPayload> {
  type: 'onoperationpending';
}

// 9) onoperationsuccess - order completed, payment has been received
export interface OnOperationSuccess extends WidgetEvent<OrderPayload> {
  type: 'onoperationsuccess';
}

// 10) onoperationfail - order declined, due to service failure, fraud control, or other
export interface OnOperationFail extends WidgetEvent<OrderPayload> {
  type: 'onoperationfail';
}
