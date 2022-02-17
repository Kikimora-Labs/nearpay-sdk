/**
 * **Check full documentation here**
 *
 * https://kikimora-labs.notion.site/NearPay-Widget-Documentation-for-Merchants-fbf29ddaf92d4ea190ad92aef4d90474
 *
 * `toCurrency` - Provide crypto ticker for example `NEAR` if you want to lock receiving currency, customer won't be able to change that
 *
 * `toAmount` - Only available if `toCurrency` is provided, you may also lock amount
 *
 * `toWallet` - Only available if `toCurrency` is provided, this wallet will receive all funds
 *
 * `merchantOrderId` - Custom string, your order identifier to help you track orders.
 *
 * `apiKey` - You merchant public key, NOT A SECRET KEY
 */
export interface WidgetParams {
    toCurrency?: string;
    toAmount?: string;
    toWallet?: string;
    merchantOrderId?: string;
    apiKey?: string;
}
export interface SignedWidgetParams extends WidgetParams {
    signature: string;
}
