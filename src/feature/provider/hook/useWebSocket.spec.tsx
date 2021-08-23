import { renderHook } from '@testing-library/react-hooks'

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

import { useWebSocket } from './useWebSocket'

describe('useWebSocket', () => {
  it('Returns a WebSocket provider', () => {
    const doc = new Y.Doc()

    const { result } = renderHook(
      () => useWebSocket(doc, 'ws://localhost:1234', 'room')
    )

    expect(result.current).toBeInstanceOf(WebsocketProvider)
  })
})
