import React from 'react'
import { WebsocketProvider } from 'y-websocket'

import { useDoc, useProviders } from '../../doc'

export const useWebSocket = (
  url: string,
  room: string
): WebsocketProvider => {
  const doc = useDoc()
  const providers = useProviders()

  const existingProvider = React.useMemo(
    () =>
      Array.from(providers.values())
        .find((provider): provider is WebsocketProvider =>
          provider instanceof WebsocketProvider &&
          provider.url === url &&
          provider.roomname === room
        ),
    [providers, url, room]
  )

  if (existingProvider !== undefined) {
    return existingProvider
  } else {
    const provider = React.useMemo(
      () => new WebsocketProvider(url, room, doc),
      [doc, url, room]
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
