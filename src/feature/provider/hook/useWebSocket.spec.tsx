import { renderHook } from '@testing-library/react-hooks'

import React from 'react'
import { WebsocketProvider } from 'y-websocket'

import { useWebSocket } from './useWebSocket'
import { DocumentProvider } from '@/feature/doc'

describe('useWebSocket', () => {
  it('Returns a WebSocket provider', () => {
    const { result } = renderHook(
      () => useWebSocket('ws://localhost:1234', 'room'),
      {
        wrapper: ({ children }) =>
          (
            <DocumentProvider>
              {children}
            </DocumentProvider>
          )
      }
    )

    expect(result.current).toBeInstanceOf(WebsocketProvider)
  })
})
