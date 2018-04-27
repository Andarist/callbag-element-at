import forEach from 'callbag-for-each'
import fromIter from 'callbag-from-iter'
import pipe from 'callbag-pipe'
import subject from 'callbag-subject'
import subscribe from 'callbag-subscribe'

import elementAt from '../src'

test('works with pullable source', () => {
  const actual = []

  pipe(
    fromIter([10, 20, 30, 40, 50]),
    elementAt(2),
    forEach(data => {
      actual.push(data)
    }),
  )

  expect(actual).toEqual([30])
})

test('works with listenable source', () => {
  const actual = []
  let next

  const source = subject()

  pipe(
    source,
    elementAt(2),
    forEach(data => {
      actual.push(data)
    }),
  )

  return Promise.resolve()
    .then(() => {
      expect(actual).toEqual([])
      source(1, 10)
    })
    .then(() => {
      source(1, 20)
      source(1, 30)
    })
    .then(() => {
      expect(actual).toEqual([30])
      source(1, 40)
      source(1, 50)
    })
    .then(() => {
      expect(actual).toEqual([30])
    })
})

test('throws on invalid index', () => {
  expect.assertions(2)

  const actual = []

  pipe(
    fromIter([10, 20, 30, 40, 50]),
    elementAt(-1),
    subscribe({
      next: data => {
        actual.push(data)
      },
      error: err => {
        expect(err.message).toMatchSnapshot()
      },
    }),
  )

  expect(actual).toEqual([])
})

test('throws on out of range index', () => {
  expect.assertions(2)

  const actual = []

  pipe(
    fromIter([10, 20, 30, 40, 50]),
    elementAt(10),
    subscribe({
      next: data => {
        actual.push(data)
      },
      error: err => {
        expect(err.message).toMatchSnapshot()
      },
    }),
  )

  expect(actual).toEqual([])
})

test('uses default value when provided on out of range index', () => {
  const actual = []

  pipe(
    fromIter([10, 20, 30, 40, 50]),
    elementAt(10, 'default'),
    forEach(data => {
      actual.push(data)
    }),
  )

  expect(actual).toEqual(['default'])
})
