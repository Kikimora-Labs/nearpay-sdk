import {EnvironmentMode} from '../interfaces/environment';

export const getWidgetUrl = (environment: EnvironmentMode) => {
  return environment === 'development'
    ? 'https://dev-widget.nearpay.co'
    : 'https://widget.nearpay.co';
};
