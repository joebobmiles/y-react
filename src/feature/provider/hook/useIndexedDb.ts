import React from 'react'
import { IndexeddbPersistence } from 'y-indexeddb'

import { useDoc, useProviders } from '../../doc'

export const useIndexedDb = (name: string): IndexeddbPersistence => {
  const doc = useDoc()
  const providers = useProviders()

  const existingProvider = React.useMemo(
    () =>
      Array.from(providers.values())
        .find((provider): provider is IndexeddbPersistence =>
          provider instanceof IndexeddbPersistence && provider.db?.name === name
        ),
    [providers, name]
  )

  if (existingProvider !== undefined) {
    return existingProvider
  } else {
    const provider = React.useMemo(
      () => new IndexeddbPersistence(name, doc),
      [doc, name]
    )

    providers.add(provider)

    return provider
  }
}
