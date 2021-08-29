import React from 'react'
import { WebsocketProvider } from 'y-websocket'

import { useDoc, useProviders } from '@/feature/doc'

export const useWebSocket = (
  url: string,
  room: string
): WebsocketProvider => {
  const doc = useDoc()
  const providers = useProviders()

  const existingProvider =
    providers.get(WebsocketProvider)?.get(room) as WebsocketProvider | undefined

  const provider = React.useMemo(
    () => new WebsocketProvider(url, room, doc),
    [doc, room]
  )

  if (existingProvider !== undefined) {
    return existingProvider
  } else {
    if (!(providers.has(WebsocketProvider))) {
      providers.set(WebsocketProvider, new Map())
    }

    providers.get(WebsocketProvider)?.set(room, provider)

    return provider
  }
}
