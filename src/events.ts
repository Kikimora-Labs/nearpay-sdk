export enum EventType {
  onload = 'onload',
  onerror = 'onerror',
  onresize = 'onresize',
  onexit = 'onexit',
  onstarted = 'onstarted',
  onoperationcreated = 'onoperationcreated',
  onpaymentsent = 'onpaymentsent',
  onoperationsuccess = 'onoperationsuccess',
  onoperationfail = 'onoperationfail',
  onoperationpending = 'onoperationpending',
  onunsupported = 'onunsupported',
  onforcecontinue = 'onforcecontinue'
}

export interface WidgetEvent<T = EventPayload> {
  type: EventType | keyof typeof EventType; // second type is for previous version compatability
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

export interface UnsupportedPayload {
  reason: string;
}

export interface ForceContinuePayload {
  unsupported: string;
}

export type EventPayload = ResizePayload | ErrorPayload | OrderPayload | null;

/**
 *  onloaded - Widget succesfully initalized, and ready to be interacted with
 */
export interface OnLoadedEvent extends WidgetEvent<ResizePayload> {
  type: EventType.onload;
}

/**
 *  onerror - An error in the work of the widget, which does not allow the process to continue
 */
export interface OnErrorEvent extends WidgetEvent<ErrorPayload> {
  type: EventType.onerror;
}

/**
 *  onresize - Resizing the document inside the iframe widget
 */
export interface OnResizeEvent extends WidgetEvent<ResizePayload> {
  type: EventType.onresize;
}

/**
 *  onexit - Close the widget, contains no data
 */
export interface OnExitEvent extends WidgetEvent<null> {
  type: EventType.onexit;
}

/**
 *  onstarted - The widget started from the starting point (called at each reset to the beginning)
 */
export interface OnStartedEvent extends WidgetEvent<null> {
  type: EventType.onstarted;
}

/**
 *  onoperationcreated - user had been authenticated and order had been created
 */
export interface OnOperationCreated extends WidgetEvent<OrderPayload> {
  type: EventType.onoperationcreated;
}

/**
 *  onpaymentsent - Sending payment data - the user clicked on Pay, does not contain data
 */
export interface OnPaymentSent extends WidgetEvent<OrderPayload> {
  type: EventType.onpaymentsent;
}

/**
 *  onoperationpending - payment is pending to be confirmed
 */
export interface OnOperationPending extends WidgetEvent<OrderPayload> {
  type: EventType.onoperationpending;
}

/**
 *  onoperationsuccess - order completed, payment has been received
 */
export interface OnOperationSuccess extends WidgetEvent<OrderPayload> {
  type: EventType.onoperationsuccess;
}

/**
 *  onoperationfail - order declined, due to service failure, fraud control, or other
 */
export interface OnOperationFail extends WidgetEvent<OrderPayload> {
  type: EventType.onoperationfail;
}

export interface OnUnsupported extends WidgetEvent<UnsupportedPayload> {
  type: EventType.onunsupported;
}

export interface OnForceContinue extends WidgetEvent<ForceContinuePayload> {
  type: EventType.onforcecontinue;
}

export type NearpayEventMap = {
  [EventType.onload]: OnLoadedEvent;
  [EventType.onerror]: OnErrorEvent;
  [EventType.onresize]: OnResizeEvent;
  [EventType.onexit]: OnExitEvent;
  [EventType.onstarted]: OnStartedEvent;
  [EventType.onoperationcreated]: OnOperationCreated;
  [EventType.onpaymentsent]: OnPaymentSent;
  [EventType.onoperationsuccess]: OnOperationSuccess;
  [EventType.onoperationfail]: OnOperationFail;
  [EventType.onoperationpending]: OnOperationPending;
  [EventType.onunsupported]: OnUnsupported;
  [EventType.onforcecontinue]: OnForceContinue;
}
