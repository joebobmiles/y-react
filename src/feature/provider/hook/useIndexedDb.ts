import React from 'react'
import { IndexeddbPersistence } from 'y-indexeddb'
import { useDoc } from '../../doc'

export const useIndexedDb = (name: string): IndexeddbPersistence => {
  const doc = useDoc()

  return React.useMemo(
    () =>
      new IndexeddbPersistence(name, doc),
    [name]
  )
}
