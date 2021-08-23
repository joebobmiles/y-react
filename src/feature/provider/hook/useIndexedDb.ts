import React from 'react'
import * as Y from 'yjs'
import { IndexeddbPersistence } from 'y-indexeddb'

export const useIndexedDb = (doc: Y.Doc, name: string): IndexeddbPersistence =>
  React.useMemo(
    () =>
      new IndexeddbPersistence(name, doc),
    [doc, name]
  )
