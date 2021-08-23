import { renderHook } from '@testing-library/react-hooks'
import 'fake-indexeddb/auto'

import * as Y from 'yjs'
import { IndexeddbPersistence } from 'y-indexeddb'

import { useIndexedDb } from './useIndexedDb'

describe('useIndexedDb', () => {
  it('Returns an IndexedDB provider', () => {
    const doc = new Y.Doc()

    const { result } = renderHook(
      () => useIndexedDb(doc, 'test')
    )

    expect(result.current).toBeInstanceOf(IndexeddbPersistence)
  })
})
