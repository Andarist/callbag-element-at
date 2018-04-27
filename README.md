# callbag-element-at

Callbag operator that emits the single value at the specified `index`.

## Example

```js
import elementAt from 'callbag-element-at'
import forEach from 'callbag-for-each'
import fromEvent from 'callbag-from-event'
import pipe from 'callbag-pipe'

pipe(
  fromEvent(document, 'click'),
  elementAt(2),
  forEach(event => {
    // will log 3rd click
    console.log(event)
  }),
)
```
