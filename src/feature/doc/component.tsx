import React from 'react'
import * as Y from 'yjs'

import { useDoc } from './hook'

export const DocumentContext = React.createContext<Y.Doc>(new Y.Doc())

interface DocumentProviderProps {
  children: React.ReactNode
  folderName?: string
  documentName?: string
}

export const DocumentProvider = ({
  children,
  folderName,
  documentName
}: DocumentProviderProps): JSX.Element => {
  let superDoc: Y.Doc | null = null
  try { superDoc = useDoc() } catch { }

  const doc: Y.Doc = new Y.Doc()
  if (superDoc !== null) {
    superDoc.getMap(folderName ?? '').set(documentName ?? doc.guid, doc)
  }

  return (
    <DocumentContext.Provider value={doc}>
      {children}
    </DocumentContext.Provider>
  )
}
