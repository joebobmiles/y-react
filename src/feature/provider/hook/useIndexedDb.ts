import React from 'react'
import { IndexeddbPersistence } from 'y-indexeddb'

import { useDoc, useProviders } from '../../doc'

export const useIndexedDb = (name: string): IndexeddbPersistence => {
  const doc = useDoc()
  const providers = useProviders()

  const existingProvider =
    providers.get(IndexeddbPersistence)?.get(name) as IndexeddbPersistence | undefined

  if (existingProvider !== undefined) {
    return existingProvider
  } else {
    const provider = React.useMemo(
      () => new IndexeddbPersistence(name, doc),
      [doc, name]
    )

    if (!providers.has(IndexeddbPersistence)) {
      providers.set(IndexeddbPersistence, new Map())
    }

    providers.get(IndexeddbPersistence)?.set(name, provider)

    return provider
  }
}
