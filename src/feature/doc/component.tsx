import React from 'react'
import * as Y from 'yjs'

import { useDoc } from './hook'

export const DocumentContext = React.createContext<Y.Doc | null>(null)

interface DocumentProviderProps {
  children: React.ReactNode
  doc?: Y.Doc
  folderName?: string
  documentName?: string
}

export const DocumentProvider = ({
  children,
  doc = new Y.Doc(),
  folderName,
  documentName
}: DocumentProviderProps): JSX.Element => {
  let superDoc: Y.Doc | null = null
  try { superDoc = useDoc() } catch { }

  if (superDoc !== null) {
    superDoc.getMap(folderName ?? '').set(documentName ?? doc.guid, doc)
  }

  return (
    <DocumentContext.Provider value={doc}>
      {children}
    </DocumentContext.Provider>
  )
}
