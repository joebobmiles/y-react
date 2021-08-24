import React from 'react'
import { WebrtcProvider } from 'y-webrtc'

import { useDoc } from '../../doc'

export const useWebRtc = (room: string): WebrtcProvider => {
  const doc = useDoc()

  return React.useMemo(
    () => new WebrtcProvider(room, doc),
    [room]
  )
}
