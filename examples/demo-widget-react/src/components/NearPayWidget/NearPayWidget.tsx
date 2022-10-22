import React, {useEffect, useRef} from 'react';

import {
  EnvironmentMode,
  EventType,
  makeSignatureString,
  NearPay,
  OrderPayload,
  ResizePayload,
  WidgetParams,
} from '@nearpay/nearpay-sdk';

function createElement(id: string) {
  const element = document.createElement('div');
  element.id = id;
  return element as HTMLDivElement;
}

interface NearPayWidgetProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  children?: React.ReactNode;
  environment?: EnvironmentMode;
  params?: WidgetParams;
}

const NearPayWidgetComponent = ({
  id = 'nearpay-widget-container',
  environment = 'development',
  params = {},
  ...rest
}: NearPayWidgetProps) => {
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('⭕⭕⭕ params =', params);
    /** @info You need to sign all of your requests
     *  @link https://kikimora-labs.notion.site/Dev-Documentation-SDKs-for-Merchants-fbf29ddaf92d4ea190ad92aef4d90474#33ba7e1aface4040b681589df897fe19
     */
    const signature = makeSignatureString(params);
    console.log('⭕⭕⭕ signature =', signature);

    let container = createElement(id);
    refContainer.current?.append(container);
    const widget = new NearPay({
      mountElement: container,
      environment: environment,
      params: {
        // signature: signature,
        signature: '',
        ...params,
      },
    });
    const listener = (data: ResizePayload) => {
      console.log('🟢🟢🟢 widget', widget);
      console.log('onload', data);
    };

    const onOrderCreated = (data: OrderPayload) => {
      console.log('order created', data);
    };

    widget.addListener(EventType.Onload, listener);
    widget.addListener(EventType.Onoperationcreated, onOrderCreated);

    widget.init();

    return () => {
      widget.removeListener(EventType.Onload, listener);
      widget.removeListener(EventType.Onoperationcreated, onOrderCreated);
      // unsubsribe
      // widget.removeEventListener('onload', listener);
      refContainer.current?.removeChild(container);
    };
  }, [environment, params]);

  return <div ref={refContainer} {...rest}></div>;
};

export const NearPayWidget = React.memo(NearPayWidgetComponent);
export type {NearPayWidgetProps};
