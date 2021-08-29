import { renderHook } from '@testing-library/react-hooks'

import React from 'react'
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
})
