import {SignedWidgetParams} from '../interfaces/widget-parameters';
import {EnvironmentMode} from '../interfaces/environment';
const removeUndefined = (object: Record<string, any>) => {
  const copy: Record<string, any> = {};

  Object.keys(object).forEach((key) => {
    if (object[key] !== undefined) {
      copy[key] = object[key];
    }
  });

  return copy;
};

export const makeParamsQuery = ({
  apiKey,
  toWallet,
  toCurrency,
  signature,
  orderId,
}: Partial<SignedWidgetParams>) => {
  const params = new URLSearchParams(
    removeUndefined({
      toWallet,
      toCurrency,
      apiKey: apiKey,
      signature: signature,
      orderId: orderId,
    }),
  ).toString();

  return `${params}`;
};

export const getWidgetUrl = (environment: EnvironmentMode) => {
  return environment === 'development'
    ? 'https://dev-widget.nearpay.co'
    : 'https://widget.nearpay.co';
};
