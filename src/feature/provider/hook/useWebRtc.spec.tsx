import { renderHook } from '@testing-library/react-hooks'

import React from 'react'
import { WebrtcProvider } from 'y-webrtc'

import { useWebRtc } from './useWebRtc'
import { DocumentProvider } from '../../doc'

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
})
