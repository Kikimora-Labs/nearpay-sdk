import {getWidgetUrl, isNearpayEvent} from '../helpers';
import {SignedWidgetParams} from '../interfaces/widget-parameters';
import {EnvironmentMode} from '../interfaces/environment';
import {getWindow} from '../helpers/global';
import {NearpayEventMap, WidgetEvent } from '..';

const ERROR_NO_MOUNT_ELEMENT = new Error('[NearPay]: provide mount element');

const DEFAULTS = {
  IFRAME_CLASS: 'NearPay__iframe',
  IFRAME_ID: 'near-pay-iframe',
};

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
type NearPayParams = {
  mountElement: HTMLElement;
  environment?: EnvironmentMode;
  params?: SignedWidgetParams;
  iframeClass?: string;
  iframeId?: string;
};

export class NearPay {
  public iframe: HTMLIFrameElement | null = null;
  public mountElement: HTMLElement;
  private _listeners: { [key: string]: Set<(data: any) => void> };
  private _params: SignedWidgetParams | null;
  private _env: EnvironmentMode;
  private _initialized = false;
  private _iframeClass: string;
  private _iframeId: string;


  constructor({
    mountElement,
    environment = 'production',
    iframeClass = DEFAULTS.IFRAME_CLASS,
    iframeId = DEFAULTS.IFRAME_ID,
    params,
  }: NearPayParams) {
    if (!mountElement) {
      throw ERROR_NO_MOUNT_ELEMENT;
    }
    this._iframeClass = iframeClass;
    this._iframeId = iframeId;
    this.mountElement = mountElement;
    this._env = environment;
    this._params = params || null;
    this._listeners = {}
  }

  private startWindowHandling() {
    const window = getWindow();
    if (window) {
      window.addEventListener('message', (event: MessageEvent<{data: WidgetEvent}>) => {
        if (isNearpayEvent(event)) {
          const callbacks = this._listeners[event.data.data.type];
          if (callbacks) {
            Array.from(callbacks).forEach(cb => cb(event.data.data.payload));
          }
        }
      })
    }
  }

  private createIframe() {
    const iframe = document.createElement('iframe');
    iframe.classList.add(this._iframeClass);
    iframe.id = this._iframeId;
    iframe.src = getWidgetUrl(this._env, this._params || undefined);
    return iframe;
  }

  public init() {
    if (this._initialized) return;

    this.startWindowHandling();
    const iframe = this.createIframe();

    this.mountElement.appendChild(iframe);
    this.iframe = iframe;
    this._initialized = true;
  }

  public addListener <K extends keyof NearpayEventMap>(
      type: K, listener: (data: NearpayEventMap[K]["payload"]) => void): void {
    if (!this._listeners[type]) {
      this._listeners[type] = new Set();
    }

    this._listeners[type].add(listener);
  }

  public removeListener <K extends keyof NearpayEventMap>(
      type: K, listener: (data: NearpayEventMap[K]["payload"]) => void): void {
    if (!this._listeners[type]) {
      return;
    }
    
    this._listeners[type].delete(listener);
  }
}
