# NearPay Widget SDK

`@nearpay/nearpay-sdk` allows you to easily integrate the NearPay widget into your web app and communicate with it.

Using this SDK is not necessary, although it will simplify your expirience and therefore is recommended.

It's written with TypeScript, with all the typings defined out of the box.


## Installation

You can find the package here - https://www.npmjs.com/package/@nearpay/nearpay-sdk.

Install via Yarn:

```shell
yarn add @nearpay/nearpay-sdk
```

Install via npm:
```shell
npm install @nearpay/nearpay-sdk
```

## Quick Start
 
```ts
import { NearPay, SignedWidgetParams } from '@nearpay/nearpay-sdk';

// more info about params available at SignedWidgetParams definition
const params: SignedWidgetParams = {
  toAmount: '',
  toCurrency: '',
  toAddress: '',
  signature: '',
  apiKey: 'your-public-api-key',
};

const body = document.querySelector('body');

const widget = new NearPay({
  mountElement: body
  environment: 'development',
  params
});

// render iframe
widget.init();
```

## NearPay Events

NearPay widget notifies parent window (your website), via `window.postMessage` interface.

### Example of sent event:
```js
{
	source: "nearpay_widget",
	data: {
		type: "onload",
		payload: { width: 480, height: 612 }
	},
}
```

### Subscribing to events
There is  `isNearpayEvent` helper function for catching NearPay events

```ts
import { isNearpayEvent } from '@nearpay/nearpay-sdk';

window.addEventListener('message', (event) => {
  if (isNearpayEvent(event)) {
    // react to changes!
  }
})
```

### Available Events
All the typings for events and their `payload` are defined and exported from `@nearpay/nearpay-sdk`

```ts
// EventType is a union type that consist of every event type available
import { 
  EventType, 
  OnLoadedEvent,
  OnErrorEvent,
  OnResizeEvent,
  OnExitEvent,
  OnStartedEvent,
  OnOperationCreated,
  OnPaymentSent,
  OnOperationPending,
  OnOperationSuccess,
  OnOperationFail  
} from '@nearpay/nearpay-sd';,
```

## 📖 Integration Docs
Look for more info about integrating NearPay into your products [here](https://kikimora-labs.notion.site/NearPay-Widget-Documentation-for-Merchants-fbf29ddaf92d4ea190ad92aef4d90474)


