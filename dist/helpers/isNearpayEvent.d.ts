import { NearpayEventMap, WidgetEvent } from '../events';
export declare function isNearpayEvent(event: MessageEvent): event is MessageEvent<WidgetEvent>;
export declare function onNearpayEvent<K extends keyof NearpayEventMap>(type: K, listener: (data: NearpayEventMap[K]) => void): void;
