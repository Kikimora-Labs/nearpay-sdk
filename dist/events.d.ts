export declare type EventType = 'onload' | 'onerror' | 'onresize' | 'onexit' | 'onstarted' | 'onoperationcreated' | 'onpaymentsent' | 'onoperationsuccess' | 'onoperationfail' | 'onoperationpending';
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
export declare type EventPayload = ResizePayload | ErrorPayload | OrderPayload | null;
export interface OnLoadedEvent extends WidgetEvent<ResizePayload> {
    type: 'onload';
}
export interface OnErrorEvent extends WidgetEvent<ErrorPayload> {
    type: 'onerror';
}
export interface OnResizeEvent extends WidgetEvent<ResizePayload> {
    type: 'onresize';
}
export interface OnExitEvent extends WidgetEvent<null> {
    type: 'onexit';
}
export interface OnStartedEvent extends WidgetEvent<null> {
    type: 'onstarted';
}
export interface OnOperationCreated extends WidgetEvent<OrderPayload> {
    type: 'onoperationcreated';
}
export interface OnPaymentSent extends WidgetEvent<OrderPayload> {
    type: 'onpaymentsent';
}
export interface OnOperationPending extends WidgetEvent<OrderPayload> {
    type: 'onoperationpending';
}
export interface OnOperationSuccess extends WidgetEvent<OrderPayload> {
    type: 'onoperationsuccess';
}
export interface OnOperationFail extends WidgetEvent<OrderPayload> {
    type: 'onoperationfail';
}
