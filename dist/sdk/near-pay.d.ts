import { SignedWidgetParams } from '../interfaces/widget-parameters';
import { EnvironmentMode } from '../interfaces/environment';
import { EventType, NearpayEventMap } from '..';
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
    private _listeners;
    private _params;
    private _env;
    private _initialized;
    private _iframeClass;
    private _iframeId;
    constructor({ mountElement, environment, params, }: NearPayParams);
    private startWindowHandling;
    private createIframe;
    init(): void;
    addListener<K extends keyof NearpayEventMap>(type: K, listener: (data: NearpayEventMap[K]['payload']) => void): void;
    removeListener<K extends EventType>(type: K, listener: (data: NearpayEventMap[K]['payload']) => void): void;
}
export {};
