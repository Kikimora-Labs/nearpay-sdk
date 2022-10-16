import {WidgetParams} from '../interfaces/widget-parameters';

/**
 * @param params Pass your merchant parameters without `signature`
 * @returns `string` which you should hash using your `secret_key`
 */
export function makeSignatureString(params: WidgetParams): string {
  return (Object.keys(params) as Array<keyof WidgetParams>)
    .sort()
    .map((key) => `${key}:${params[key]}`)
    .join('');
}
