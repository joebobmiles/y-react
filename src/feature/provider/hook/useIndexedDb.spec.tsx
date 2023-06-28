import { renderHook } from '@testing-library/react'

import React from 'react'
import 'fake-indexeddb/auto'
import { IndexeddbPersistence } from 'y-indexeddb'

import { useIndexedDb } from './useIndexedDb'
import { DocumentProvider } from '@/feature/doc'

describe('useIndexedDb', () => {
  it('Returns an IndexedDB provider', async () => {
    const { result } = renderHook(
      () => useIndexedDb('test'),
      {
        wrapper: ({ children }) =>
          (
            <DocumentProvider>
              {children}
            </DocumentProvider>
          )
      }
    )

    expect(result.current).toBeInstanceOf(IndexeddbPersistence)
  })
})
