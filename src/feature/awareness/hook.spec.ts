import { act, renderHook } from '@testing-library/react'

import * as Y from 'yjs'
import { Awareness } from 'y-protocols/awareness'

import { useAwareness } from './hook'

jest.mock(
  'y-protocols/awareness',
  () =>
    ({
      Awareness: class {
        clientID: number
        states: Map<number, { [x: string]: any }> = new Map()

        constructor (doc: Y.Doc) {
          this.clientID = doc.clientID
          this.setLocalState({})
        }

        getStates (): Map<number, { [x: string]: any }> {
          return this.states as Map<number, { [x: string]: any }>
        }

        on (): void {}
        off (): void {}

        getLocalState (): { [x: string]: any } {
          return this.states.get(this.clientID) ?? {}
        }

        setLocalState (state: { [x: string]: any }): void {
          this.states.set(this.clientID, state)
        }
      }
    })
)

describe('useAwareness', () => {
  it('Returns a list of awareness states.', () => {
    const doc = new Y.Doc()
    const awareness = new Awareness(doc)

    const { result } = renderHook(
      () => useAwareness(awareness)
    )

    expect(
      Array.from(
        result.current.states.entries()
      )
    ).toHaveLength(1)
  })

  it('Allows local state to be set.', () => {
    const doc = new Y.Doc()
    const awareness = new Awareness(doc)

    const { result } = renderHook(
      () => useAwareness(awareness)
    )

    act(() => {
      result.current.setLocalState({
        foo: 1
      })
    })

    expect(result.current.localState).toEqual({ foo: 1 })
  })

  it('Allows local state to be set via function.', () => {
    const doc = new Y.Doc()
    const awareness = new Awareness(doc)

    const { result } = renderHook(
      () => useAwareness(awareness)
    )

    act(() => {
      result.current.setLocalState(
        (prevState) => ({
          ...prevState,
          foo: 1
        })
      )
    })

    expect(result.current.localState).toEqual({ foo: 1 })
  })
})
