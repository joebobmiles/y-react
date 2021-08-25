import React from 'react'
import { WebrtcProvider } from 'y-webrtc'

import { useDoc, useProviders } from '../../doc'

export const useWebRtc = (room: string): WebrtcProvider => {
  const doc = useDoc()
  const providers = useProviders()

  const existingProvider = React.useMemo(
    () =>
      Array.from(providers.values())
        .find((provider): provider is WebrtcProvider =>
          provider instanceof WebrtcProvider && provider.roomName === room
        ),
    [providers, room]
  )

  if (existingProvider !== undefined) {
    return existingProvider
  } else {
    const provider = React.useMemo(
      () => new WebrtcProvider(room, doc),
      [doc, room]
    )

    React.useEffect(
      () =>
        () => {
          providers.delete(provider)
          provider.destroy()
        },
      []
    )

    providers.add(provider)

    return provider
  }
}
