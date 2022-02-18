import {SignedWidgetParams} from '../interfaces/widget-parameters';

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
  toAmount,
  signature,
  merchantOrderId,
}: Partial<SignedWidgetParams>) => {
  const params = new URLSearchParams(
    removeUndefined({
      toWallet,
      toCurrency,
      toAmount,
      merchantOrderId,
      apiKey,
      signature,
    }),
  ).toString();

  return `${params}`;
};
