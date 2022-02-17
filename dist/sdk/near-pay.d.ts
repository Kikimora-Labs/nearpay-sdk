import { SignedWidgetParams } from '../interfaces/widget-parameters';
import { EnvironmentMode } from '../interfaces/environment';
declare type NearPayParams = {
    mountElement: HTMLElement;
    environment: EnvironmentMode;
    params: SignedWidgetParams | {};
    iframeClass: string;
    iframeId: string;
};
export declare class NearPay {
    iframe: HTMLIFrameElement | null;
    mountElement: HTMLElement;
    _params: SignedWidgetParams | {};
    _env: EnvironmentMode;
    _initialized: boolean;
    _iframeClass: string;
    _iframeId: string;
    constructor({ mountElement, environment, iframeClass, iframeId, params, }: NearPayParams);
    get link(): string;
    createIframe(): HTMLIFrameElement;
    init(): void;
}
export {};
