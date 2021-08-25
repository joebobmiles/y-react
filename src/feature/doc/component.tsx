import React from 'react'
import * as Y from 'yjs'

import { Provider } from './type'
import { useDoc } from './hook'

export const DocumentContext = React.createContext<{
  doc: Y.Doc | null
  providers: Set<Provider> | null
}>({
  doc: null,
  providers: null
})

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

  const providers = React.useRef(new Set<Provider>())

  return (
    <DocumentContext.Provider
      value={{
        doc,
        providers: providers.current
      }}
    >
      {children}
    </DocumentContext.Provider>
  )
}
