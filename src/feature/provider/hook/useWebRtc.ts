import React from 'react'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'

export const useWebRtc = (doc: Y.Doc, room: string): WebrtcProvider =>
  React.useMemo(
    () =>
      new WebrtcProvider(
        room,
        doc
      ),
    [doc, room]
  )
