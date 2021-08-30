import { renderHook } from '@testing-library/react-hooks'

import React from 'react'
import { IndexeddbPersistence } from 'y-indexeddb'

import { useIndexedDb } from './useIndexedDb'
import { DocumentProvider } from '@/feature/doc'

jest.mock('y-indexeddb', () => ({
  IndexeddbPersistence: class {
    whenSynced = new Promise<void>((resolve) => resolve())
  }
}))

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

    await result.current.whenSynced

    expect(result.current).toBeInstanceOf(IndexeddbPersistence)
  })
})
