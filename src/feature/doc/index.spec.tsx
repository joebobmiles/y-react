import { renderHook } from '@testing-library/react'

import React from 'react'
import * as Y from 'yjs'

import { DocumentProvider, useDoc } from '.'

describe('useDoc', () => {
  it('Provides access to a Yjs Doc.', () => {
    const { result } = renderHook(
      () => useDoc(),
      {
        wrapper: ({ children }) =>
          <DocumentProvider>
            {children}
          </DocumentProvider>
      }
    )

    expect(result.current).toBeInstanceOf(Y.Doc)
  })

  it('Nests documents with nested document providers.', () => {
    const { result } = renderHook(
      () => useDoc(),
      {
        wrapper: ({ children }) =>
          <DocumentProvider>
            {children}
            <DocumentProvider documentName='subdoc'>
              <></>
            </DocumentProvider>
          </DocumentProvider>
      }
    )

    expect(result.current.getSubdocs().size).toBe(1)
  })

  it('Properly nests deeply nested document providers.', () => {
    const { result } = renderHook(
      () => useDoc(),
      {
        wrapper: ({ children }) =>
          <DocumentProvider>
            {children}
            <DocumentProvider documentName='subdoc'>
              <DocumentProvider documentName='subdoc'>
                <></>
              </DocumentProvider>
            </DocumentProvider>
          </DocumentProvider>
      }
    )

    expect(result.current.getSubdocs().size).toBe(1)
    expect(Array.from(result.current.getSubdocs().values()).length).toBe(1)
  })

  it('Throws an error when not inside a DocumentProvider.', () => {
    const { result } = renderHook(() => useDoc())

    expect(result.error).toEqual(new Error(
      'Could not retrieve a document. Please wrap in a DocumentProvider.'
    ))
  })
})
