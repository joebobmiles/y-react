/* eslint-env jest */
import { renderHook } from '@testing-library/react'

import React from 'react'
import * as Y from 'yjs'

jest.mock('y-webrtc', () => ({
  WebrtcProvider: jest.fn()
}))
/* eslint-disable import/first */
import { WebrtcProvider } from 'y-webrtc'

import { useWebRtc } from './useWebRtc'
import { DocumentProvider } from '@/feature/doc'

describe('useWebRtc', () => {
  it('Returns a WebRTC provider', () => {
    const { result } = renderHook(
      () => useWebRtc('room'),
      {
        wrapper: ({ children }) =>
          (
            <DocumentProvider>
              {children}
            </DocumentProvider>
          )
      }
    )

    expect(result.current).toBeInstanceOf(WebrtcProvider)
  })

  it('Returns the same WebRTC provider under the same document.', () => {
    expect(() => renderHook(
      () => useWebRtc('room'),
      {
        wrapper: ({ children }) =>
          (
            <DocumentProvider>
              {children}
              {children}
            </DocumentProvider>
          )
      }
    )).not.toThrowError(
      'Error: A Yjs Doc connected to room "room" already exists!'
    )
  })

  it('Does not error on rerender.', () => {
    expect(() => {
      const { rerender } = renderHook(
        () => useWebRtc('room'),
        {
          wrapper: ({ children }) =>
            (
              <DocumentProvider>
                {children}
              </DocumentProvider>
            )
        }
      )

      rerender()
    }).not.toThrowError(
      'Error: A Yjs Doc connected to room "room" already exists!'
    )
  })

  it('Passes password option to WebrtcProvider.', () => {
    jest.resetAllMocks()

    const doc = new Y.Doc()

    renderHook(
      () => useWebRtc('room', {
        password: 'password'
      }),
      {
        wrapper: ({ children }) =>
          (
            <DocumentProvider doc={doc}>
              {children}
            </DocumentProvider>
          )
      }
    )

    expect(WebrtcProvider).toBeCalledWith('room', doc, {
      password: 'password'
    })
  })
})
