import React from 'react'
import { IndexeddbPersistence } from 'y-indexeddb'

import { useDoc, useProviders } from '@/feature/doc'

export const useIndexedDb = (name: string): IndexeddbPersistence => {
  const doc = useDoc()
  const providers = useProviders()

  const existingProvider =
    providers.get(IndexeddbPersistence)?.get(name) as IndexeddbPersistence | undefined

  const provider = React.useMemo(
    () => new IndexeddbPersistence(name, doc),
    [doc, name]
  )

  if (existingProvider !== undefined) {
    return existingProvider
  } else {
    if (!(providers.has(IndexeddbPersistence) as boolean)) {
      providers.set(IndexeddbPersistence, new Map())
    }

    providers.get(IndexeddbPersistence)?.set(name, provider)

    return provider
  }
}
