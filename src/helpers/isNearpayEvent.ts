import {WidgetEvent} from '../events';

export function isNearpayEvent(
  event: MessageEvent,
): event is MessageEvent<WidgetEvent> {
  return event.data && event.data.source === 'nearpay_widget';
}
