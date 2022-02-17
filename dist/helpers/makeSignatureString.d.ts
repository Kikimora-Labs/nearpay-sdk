import { WidgetParams } from '../interfaces/widget-parameters';
/**
 * @param params Pass your merchant parameters without `signature`
 * @returns `string` which you should hash using your `secret_key`
 */
export declare function makeSignatureString(params: WidgetParams): string;
