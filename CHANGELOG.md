# Major: 3.0.0

### Backwards incompatible changes:
* Add wildcard event listener support `nearpay.addListener("*", (e: WidgetEvent) => {})` 
* Every listener will receive `WidgetEvent` as first argument instead of `EventPayload`, so it is possible to differentiate between different events inside listener