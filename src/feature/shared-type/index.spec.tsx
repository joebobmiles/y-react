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

  it('Synchronizes state between peers.', () => {
    const doc1 = new Y.Doc()
    const doc2 = new Y.Doc()

    doc1.on('update', (update: any) => {
      Y.applyUpdate(doc2, update)
    })
    doc2.on('update', (update: any) => {
      Y.applyUpdate(doc1, update)
    })

    const { result: resultA } = renderHook(
      () => useMap('test'),
      {
        wrapper: ({ children }) => (
          <DocumentProvider doc={doc1}>
            {children}
          </DocumentProvider>
        )
      }
    )

    const { result: resultB } = renderHook(
      () => useMap('test'),
      {
        wrapper: ({ children }) => (
          <DocumentProvider doc={doc1}>
            {children}
          </DocumentProvider>
        )
      }
    )

    act(() => {
      resultA.current.set('foo', 1)
    })

    expect(resultA.current.state).toEqual({ foo: 1 })
    expect(resultB.current.state).toEqual({ foo: 1 })
  })
})

describe('useArray', () => {
  it('Returns an object representing the current Y.Array state.', () => {
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

    expect(result.current.state).toEqual([])
  })

  it('Returns functions that can get and insert into Y.Array state.', () => {
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

    expect(result.current.get(0)).toBeUndefined()

    act(() => {
      result.current.insert(0, [0])
    })

    expect(result.current.get(0)).toBe(0)
  })

  it('Outputs correct state after using insert.', () => {
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

    act(() => {
      result.current.insert(0, [1])
    })

    expect(result.current.state).toEqual([1])
  })

  it('Deletes items from array when calling delete.', () => {
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

    act(() => {
      result.current.insert(0, [1, 2, 3])
    })

    expect(result.current.state).toEqual([1, 2, 3])

    act(() => {
      result.current.delete(1, 2)
    })

    expect(result.current.state).toEqual([1])
  })

  it('Synchronizes state between peers.', () => {
    const doc1 = new Y.Doc()
    const doc2 = new Y.Doc()

    doc1.on('update', (update: any) => {
      Y.applyUpdate(doc2, update)
    })
    doc2.on('update', (update: any) => {
      Y.applyUpdate(doc1, update)
    })

    const { result: resultA } = renderHook(
      () => useArray('test'),
      {
        wrapper: ({ children }) => (
          <DocumentProvider doc={doc1}>
            {children}
          </DocumentProvider>
        )
      }
    )

    const { result: resultB } = renderHook(
      () => useArray('test'),
      {
        wrapper: ({ children }) => (
          <DocumentProvider doc={doc1}>
            {children}
          </DocumentProvider>
        )
      }
    )

    act(() => {
      resultA.current.insert(0, [1])
    })

    expect(resultA.current.state).toEqual([1])
    expect(resultB.current.state).toEqual([1])
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
