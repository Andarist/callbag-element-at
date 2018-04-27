export default function elementAt(index, defaultValue) {
  return source => (start, sink) => {
    if (start !== 0) return

    if (index < 0) {
      sink(2, new Error('Argument out of range.'))
      return
    }

    let completed = false
    let counter = index
    let talkback

    source(0, (type, data) => {
      if (completed) return

      if (type === 0) {
        talkback = data
        sink(0, talkback)
        return
      }

      if (type === 1) {
        if (counter-- !== 0) {
          talkback(1)
          return
        }
        completed = true
        sink(1, data)
        sink(2)
        return
      }

      if (type === 2) {
        completed = true

        if (defaultValue === undefined) {
          sink(2, new Error('Argument out of range.'))
          return
        }

        sink(1, defaultValue)
        sink(2)
        return
      }
    })
  }
}
