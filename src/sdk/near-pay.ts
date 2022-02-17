import {getWidgetUrl, makeParamsQuery} from '../helpers';
import {SignedWidgetParams} from '../interfaces/widget-parameters';
import {EnvironmentMode} from '../interfaces/environment';

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
  iframe: HTMLIFrameElement | null = null;
  mountElement: HTMLElement;
  _params: SignedWidgetParams | null;
  _env: EnvironmentMode;
  _initialized = false;
  _iframeClass: string;
  _iframeId: string;

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
  }

  get link() {
    if (!this._params) {
      return getWidgetUrl(this._env);
    } else {
      return `${getWidgetUrl(this._env)}?${makeParamsQuery(this._params)}`;
    }
  }

  createIframe() {
    const iframe = document.createElement('iframe');
    iframe.classList.add(this._iframeClass);
    iframe.id = this._iframeId;
    iframe.src = this.link;
    return iframe;
  }

  init() {
    if (this._initialized) return;

    const iframe = this.createIframe();

    this.mountElement.appendChild(iframe);
    this.iframe = iframe;
    this._initialized = true;
  }
}
