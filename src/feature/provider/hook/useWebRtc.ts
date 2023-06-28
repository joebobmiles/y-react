import React from 'react'
import { WebrtcProvider } from 'y-webrtc'

import { useDoc, useProviders } from '@/feature/doc'
import { Awareness } from 'y-protocols/awareness'

export const useWebRtc = (
  room: string,
  options: {
    signaling?: string[]
    password?: string
    awareness?: Awareness
    maxConns?: number
    filterBcConns?: boolean
    peerOpts?: any
  } = {}
): WebrtcProvider => {
  const doc = useDoc()
  const providers = useProviders()

  const existingProvider =
    providers.get(WebrtcProvider)?.get(room) as WebrtcProvider | undefined

  return React.useMemo(
    () => {
      if (existingProvider !== undefined) {
        return existingProvider
      } else {
        const provider = new WebrtcProvider(
          room,
          doc,
          options as {
            signaling: string[]
            password?: string
            awareness: Awareness
            maxConns: number
            filterBcConns: boolean
            peerOpts: any
          }
        )

        if (!(providers.has(WebrtcProvider))) {
          providers.set(WebrtcProvider, new Map())
        }

        providers.get(WebrtcProvider)?.set(room, provider)

        return provider
      }
    },
    [existingProvider]
  )
}
