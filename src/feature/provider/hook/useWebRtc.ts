import React from 'react'
import { WebrtcProvider } from 'y-webrtc'

import { useDoc, useProviders } from '../../doc'

export const useWebRtc = (room: string): WebrtcProvider => {
  const doc = useDoc()
  const providers = useProviders()

  const existingProvider =
    providers.get(WebrtcProvider)?.get(room) as WebrtcProvider | undefined

  const provider = React.useMemo(
    () => new WebrtcProvider(room, doc),
    [doc, room]
  )

  if (existingProvider !== undefined) {
    return existingProvider
  } else {
    if (!providers.has(WebrtcProvider)) {
      providers.set(WebrtcProvider, new Map())
    }

    providers.get(WebrtcProvider)?.set(room, provider)

    return provider
  }
}
