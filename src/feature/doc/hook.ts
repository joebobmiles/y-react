import React from 'react'
import * as Y from 'yjs'

import { DocumentContext } from './component'

export const useDoc = (): Y.Doc => {
  const value = React.useContext(DocumentContext)

  if (value !== null) {
    return value
  } else {
    throw new Error(
      'Could not retrieve a document. Please wrap in a DocumentProvider.'
    )
  }
}
