import {WidgetMessageEventData} from '../events';

export function isNearpayEvent(
  event: MessageEvent,
): event is MessageEvent<WidgetMessageEventData> {
  return event.data && event.data.source === 'nearpay_widget';
}
