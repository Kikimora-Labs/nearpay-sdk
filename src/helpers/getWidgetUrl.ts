import {EnvironmentMode} from '../interfaces/environment';
import {
  ContractCall,
  SignedWidgetParams,
} from '../interfaces/widget-parameters';

const removeUndefined = (object: Record<string, any>) => {
  const copy: Record<string, any> = {};

  Object.keys(object).forEach((key) => {
    if (object[key] !== undefined) {
      copy[key] = object[key];
    }
  });

  return copy;
};

const getContractCallEncoded = (contractCall?: ContractCall) => {
  if (!contractCall) {
    return undefined;
  }

  return encodeURIComponent(JSON.stringify(contractCall));
};

const makeParamsQuery = ({
  apiKey,
  toWallet,
  toCurrency,
  toAmount,
  signature,
  merchantOrderId,
  contractCall,
}: Partial<SignedWidgetParams>) => {
  const params = new URLSearchParams(
    removeUndefined({
      toWallet,
      toCurrency,
      toAmount,
      merchantOrderId,
      apiKey,
      signature,
      contractCall: getContractCallEncoded(contractCall),
    }),
  ).toString();

  return `${params}`;
};

const getOrigin = (environment: EnvironmentMode) => {
  switch (environment) {
    case 'production':
      return 'https://widget.munzen.io';
    case 'development':
      return 'https://dev-widget.munzen.io';
    case 'stage':
      return 'https://stage-widget.munzen.io';
    default:
      throw new Error('Environment mode is not defined');
  }
};

/**
 *
 * @param environment switch between production/development versions of widget
 *
 * @returns `url` - ready to be inserted into `iframe.src` attribute
 */
export const getWidgetUrl = (
  environment: EnvironmentMode,
  params?: SignedWidgetParams,
) => {
  const origin = getOrigin(environment);

  if (!params) {
    return origin;
  } else {
    return `${origin}?${makeParamsQuery(params)}`;
  }
};
