import { renderHook } from '@testing-library/react-hooks'

import React from 'react'
import * as Y from 'yjs'

import { DocumentProvider } from '../doc'
import { useSharedType, useMap, useArray, useText } from '.'

describe('useSharedType', () => {
  it('Returns a Y.Map.', () => {
    const { result } = renderHook(
      () => useSharedType('test', Y.Map),
      {
        wrapper: ({ children }) => (
          <DocumentProvider>
            {children}
          </DocumentProvider>
        )
      }
    )

    expect(result.current).toBeInstanceOf(Y.Map)
  })

  it('Returns a Y.Array.', () => {
    const { result } = renderHook(
      () => useSharedType('test', Y.Array),
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

  it('Returns a Y.Text.', () => {
    const { result } = renderHook(
      () => useSharedType('test', Y.Text),
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

describe('useMap', () => {
  it('Returns a Y.Map.', () => {
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

    expect(result.current).toBeInstanceOf(Y.Map)
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
