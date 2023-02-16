export declare enum EventType {
    Onload = "onload",
    Onerror = "onerror",
    Onresize = "onresize",
    Onexit = "onexit",
    Onstarted = "onstarted",
    Onoperationcreated = "onoperationcreated",
    Onpaymentsent = "onpaymentsent",
    Onoperationsuccess = "onoperationsuccess",
    Onoperationfail = "onoperationfail",
    Onoperationpending = "onoperationpending",
    Onunsupported = "onunsupported",
    Onforcecontinue = "onforcecontinue"
}
export interface WidgetMessageEventData {
    source: 'nearpay_widget';
    data: WidgetEvent;
}
export interface WidgetEvent<T = EventPayload> {
    type: EventType;
    payload: T;
}
export interface ResizePayload {
    size: {
        width: number;
        height: number;
    };
}
export interface ErrorPayload {
    error: {
        code: string;
        message: string;
    };
}
export interface OrderPayload {
    orderId?: string;
    merchantOrderId?: string;
}
export interface UnsupportedPayload {
    country?: {
        name?: string;
        isoAlpha2?: string;
        isoAlpha3?: string;
        flagUrl?: string;
    };
}
export declare type EventPayload = ResizePayload | ErrorPayload | OrderPayload | UnsupportedPayload | null;
/**
 *  onloaded - Widget succesfully initalized, and ready to be interacted with
 */
export interface OnLoadedEvent extends WidgetEvent<ResizePayload> {
    type: EventType.Onload;
}
/**
 *  onerror - An error in the work of the widget, which does not allow the process to continue
 */
export interface OnErrorEvent extends WidgetEvent<ErrorPayload> {
    type: EventType.Onerror;
}
/**
 *  onresize - Resizing the document inside the iframe widget
 */
export interface OnResizeEvent extends WidgetEvent<ResizePayload> {
    type: EventType.Onresize;
}
/**
 *  onexit - Close the widget, contains no data
 */
export interface OnExitEvent extends WidgetEvent<null> {
    type: EventType.Onexit;
}
/**
 *  onstarted - The widget started from the starting point (called at each reset to the beginning)
 */
export interface OnStartedEvent extends WidgetEvent<null> {
    type: EventType.Onstarted;
}
/**
 *  onoperationcreated - user had been authenticated and order had been created
 */
export interface OnOperationCreated extends WidgetEvent<OrderPayload> {
    type: EventType.Onoperationcreated;
}
/**
 *  onpaymentsent - Sending payment data - the user clicked on Pay, does not contain data
 */
export interface OnPaymentSent extends WidgetEvent<OrderPayload> {
    type: EventType.Onpaymentsent;
}
/**
 *  onoperationpending - payment is pending to be confirmed
 */
export interface OnOperationPending extends WidgetEvent<OrderPayload> {
    type: EventType.Onoperationpending;
}
/**
 *  onoperationsuccess - order completed, payment has been received
 */
export interface OnOperationSuccess extends WidgetEvent<OrderPayload> {
    type: EventType.Onoperationsuccess;
}
/**
 *  onoperationfail - order declined, due to service failure, fraud control, or other
 */
export interface OnOperationFail extends WidgetEvent<OrderPayload> {
    type: EventType.Onoperationfail;
}
/**
 *  onunsupported - detected user country is unsupported
 */
export interface OnUnsupported extends WidgetEvent<UnsupportedPayload> {
    type: EventType.Onunsupported;
}
/**
 *  onforcecontinue - user clicks "Force continue" button and default country (US) is applied
 */
export interface OnForceContinue extends WidgetEvent<UnsupportedPayload> {
    type: EventType.Onforcecontinue;
}
export declare type NearpayEventMap = {
    [EventType.Onload]: OnLoadedEvent;
    [EventType.Onerror]: OnErrorEvent;
    [EventType.Onresize]: OnResizeEvent;
    [EventType.Onexit]: OnExitEvent;
    [EventType.Onstarted]: OnStartedEvent;
    [EventType.Onoperationcreated]: OnOperationCreated;
    [EventType.Onpaymentsent]: OnPaymentSent;
    [EventType.Onoperationsuccess]: OnOperationSuccess;
    [EventType.Onoperationfail]: OnOperationFail;
    [EventType.Onoperationpending]: OnOperationPending;
    [EventType.Onunsupported]: OnUnsupported;
    [EventType.Onforcecontinue]: OnForceContinue;
    '*': WidgetEvent;
};
