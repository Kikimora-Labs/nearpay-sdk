import {NearpayEventMap, WidgetEvent} from '../events';
import {getWindow} from './global';

export function isNearpayEvent(
  event: MessageEvent,
): event is MessageEvent<WidgetEvent> {
  return event.data && event.data.source === 'nearpay_widget';
}

const listeners: { [key: string]: Array<(data: any) => void> } = {};

const window = getWindow();
if (window) {
  window.addEventListener('message', (event: MessageEvent<{data: WidgetEvent}>) => {
    if (isNearpayEvent(event)) {
      const callbacks = listeners[event.data.data.type];
      if (callbacks) {
        callbacks.forEach(cb => cb(event.data.data.payload));
      }
    }
  })
}

export function onNearpayEvent<K extends keyof NearpayEventMap>(type: K, listener: (data: NearpayEventMap[K]) => void) {
  if (!listeners[type]) {
    listeners[type] = [];
  }
  listeners[type].push(listener);
}
