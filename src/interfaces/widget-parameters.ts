export interface WidgetParams {
  // cannot exist without each other
  toCurrency?: string;
  toAmount?: string;
  // maybe set separately
  toWallet?: string;
  // unique order identifier, used in payment flow
  orderId?: string;
  apiKey?: string;
}

export interface SignedWidgetParams extends WidgetParams {
  signature: string;
}
