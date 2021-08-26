import React from 'react'
import * as Y from 'yjs'

import { DocumentContext } from './component'
import { Provider } from './type'

export const useDoc = (): Y.Doc => {
  const { doc } = React.useContext(DocumentContext)

  if (doc !== null) {
    return doc
  } else {
    throw new Error(
      'Could not retrieve a document. Please wrap in a DocumentProvider.'
    )
  }
}

export const useProviders = (): Map<new (...args: any) => Provider, Map<string, Provider>> => {
  const { providers } = React.useContext(DocumentContext)

  if (providers !== null) {
    return providers
  } else {
    throw new Error(
      'Could not retrieve a set of providers. Please wrap in a DocumentProvider.'
    )
  }
}
