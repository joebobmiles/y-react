import React from 'react'
import * as Y from 'yjs'
import { useForceUpdate } from '../../util'

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

export const useProviders = (): {
  providers: Set<Provider>
  addProvider: (provider: Provider) => void
} => {
  const { providers } = React.useContext(DocumentContext)
  const forceUpdate = useForceUpdate()

  if (providers !== null) {
    return {
      providers,
      addProvider: (provider) => {
        providers.add(provider)
        forceUpdate()
      }
    }
  } else {
    throw new Error(
      'Could not retrieve a set of providers. Please wrap in a DocumentProvider.'
    )
  }
}
