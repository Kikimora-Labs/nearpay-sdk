export interface WidgetParams {
    toCurrency?: string;
    toAmount?: string;
    toWallet?: string;
    orderId?: string;
    apiKey?: string;
}
export interface SignedWidgetParams extends WidgetParams {
    signature: string;
}
