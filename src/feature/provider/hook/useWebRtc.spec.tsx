import { renderHook } from '@testing-library/react-hooks'

import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'

import { useWebRtc } from './useWebRtc'

describe('useWebRtc', () => {
  it('Returns a WebRTC provider', () => {
    const doc = new Y.Doc()

    const { result } = renderHook(
      () => useWebRtc(
        doc,
        'room'
      )
    )

    expect(result.current).toBeInstanceOf(WebrtcProvider)
  })
})
