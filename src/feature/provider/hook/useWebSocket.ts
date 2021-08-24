import React from 'react'
import { WebsocketProvider } from 'y-websocket'

import { useDoc } from '../../doc'

export const useWebSocket = (
  url: string,
  room: string
): WebsocketProvider => {
  const doc = useDoc()

  return React.useMemo(
    () =>
      new WebsocketProvider(
        url,
        room,
        doc
      ),
    [url, room]
  )
}
