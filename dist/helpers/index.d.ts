import { SignedWidgetParams } from '../interfaces/widget-parameters';
import { EnvironmentMode } from '../interfaces/environment';
export declare const makeParamsQuery: ({ apiKey, toWallet, toCurrency, signature, orderId, }: Partial<SignedWidgetParams>) => string;
export declare const getWidgetUrl: (environment: EnvironmentMode) => "https://dev-widget.nearpay.co" | "https://widget.nearpay.co";
