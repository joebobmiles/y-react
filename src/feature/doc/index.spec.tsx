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

  /*
    Skipped because of breaking API changes in @testing-library/react after
    deprecating @testing-library/react-hooks.

    According to [this issue](testing-library/testing-library-docs#1060), the
    following code is preferable. However, this will likely change whenever the
    Testing Library folks stop bike-shedding.
  */
  it.skip('Throws an error when not inside a DocumentProvider.', () => {
    expect(() => renderHook(() => useDoc())).toThrow(
      'Could not retrieve a document. Please wrap in a DocumentProvider.'
    )
  })
})
