export function isNearpayEvent(event: MessageEvent) {
  return event.data && event.data.source === 'nearpay_widget';
}
