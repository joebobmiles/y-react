/* eslint-env jest */
import { renderHook } from '@testing-library/react'

import React from 'react'
import * as Y from 'yjs'
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

  /*
    This test relies on some code we need to mock related to cryptography.
  */
  it.skip('Passes password option to WebrtcProvider.', () => {
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
