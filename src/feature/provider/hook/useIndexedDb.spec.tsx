import { renderHook } from '@testing-library/react-hooks'

import * as Y from 'yjs'
import { IndexeddbPersistence } from 'y-indexeddb'

import { useIndexedDb } from './useIndexedDb'

jest.mock('y-indexeddb', () => ({
  IndexeddbPersistence: class {
    whenSynced = new Promise<void>((resolve) => resolve())
  }
}))

describe('useIndexedDb', () => {
  it('Returns an IndexedDB provider', async () => {
    const doc = new Y.Doc()

    const { result } = renderHook(
      () => useIndexedDb(doc, 'test')
    )

    await result.current.whenSynced

    expect(result.current).toBeInstanceOf(IndexeddbPersistence)
  })
})
