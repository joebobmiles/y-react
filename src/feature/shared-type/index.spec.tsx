import { act, renderHook } from '@testing-library/react-hooks'

import React from 'react'
import * as Y from 'yjs'

import { DocumentProvider } from '../doc'
import { useMap, useArray, useText } from '.'

describe('useMap', () => {
  it('Returns an object representing the current Y.Map state.', () => {
    const { result } = renderHook(
      () => useMap('test'),
      {
        wrapper: ({ children }) => (
          <DocumentProvider>
            {children}
          </DocumentProvider>
        )
      }
    )

    expect(result.current.state).toEqual({})
  })

  it('Returns functions that can get and set Y.Map state.', () => {
    const { result } = renderHook(
      () => useMap('test'),
      {
        wrapper: ({ children }) => (
          <DocumentProvider>
            {children}
          </DocumentProvider>
        )
      }
    )

    expect(result.current.get('foo')).toBeUndefined()

    act(() => {
      result.current.set('foo', 0)
    })

    expect(result.current.get('foo')).toBe(0)
  })

  it('Outputs correct state after using set.', () => {
    const { result } = renderHook(
      () => useMap('test'),
      {
        wrapper: ({ children }) => (
          <DocumentProvider>
            {children}
          </DocumentProvider>
        )
      }
    )

    act(() => {
      result.current.set('foo', 1)
    })

    expect(result.current.state).toEqual({ foo: 1 })
  })
})

describe('useArray', () => {
  it('Returns a Y.Array.', () => {
    const { result } = renderHook(
      () => useArray('test'),
      {
        wrapper: ({ children }) => (
          <DocumentProvider>
            {children}
          </DocumentProvider>
        )
      }
    )

    expect(result.current).toBeInstanceOf(Y.Array)
  })
})

describe('useText', () => {
  it('Returns a Y.Text.', () => {
    const { result } = renderHook(
      () => useText('test'),
      {
        wrapper: ({ children }) => (
          <DocumentProvider>
            {children}
          </DocumentProvider>
        )
      }
    )

    expect(result.current).toBeInstanceOf(Y.Text)
  })
})
