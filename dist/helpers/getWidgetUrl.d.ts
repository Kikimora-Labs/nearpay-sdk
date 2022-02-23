import { EnvironmentMode } from '../interfaces/environment';
import { SignedWidgetParams } from '../interfaces/widget-parameters';
/**
 *
 * @param environment switch between production/development versions of widget
 *
 * @returns `url` - ready to be inserted into `iframe.src` attribute
 */
export declare const getWidgetUrl: (environment: EnvironmentMode, params?: SignedWidgetParams | undefined) => string;
