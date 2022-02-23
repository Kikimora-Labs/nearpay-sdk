import { SignedWidgetParams } from '../interfaces/widget-parameters';
import { EnvironmentMode } from '../interfaces/environment';
/**
 * `mountElement`: HTMLElement — inside which iframe will appear
 *
 * `environment`: string — `development` or `production`, `production` is used by default
 *
 * `params`: SignedWidgetParams — optional, if you have merchant `apiKey`
 *
 * `iframeClass`: string - optional `NearPay__iframe` by defauly. You may pass custom class, it will override default one.
 *
 * `iframeId`: string - same as `iframeClass` but for #id attribute
 *
 */
declare type NearPayParams = {
    mountElement: HTMLElement;
    environment?: EnvironmentMode;
    params?: SignedWidgetParams;
    iframeClass?: string;
    iframeId?: string;
};
export declare class NearPay {
    iframe: HTMLIFrameElement | null;
    mountElement: HTMLElement;
    _params: SignedWidgetParams | null;
    _env: EnvironmentMode;
    _initialized: boolean;
    _iframeClass: string;
    _iframeId: string;
    constructor({ mountElement, environment, iframeClass, iframeId, params, }: NearPayParams);
    createIframe(): HTMLIFrameElement;
    init(): void;
}
export {};
