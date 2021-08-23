import React from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

export const useWebSocket = (
  doc: Y.Doc,
  url: string,
  room: string
): WebsocketProvider =>
  React.useMemo(
    () =>
      new WebsocketProvider(
        url,
        room,
        doc
      ),
    [doc, url, room]
  )
