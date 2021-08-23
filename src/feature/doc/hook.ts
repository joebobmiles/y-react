import React from 'react'
import * as Y from 'yjs'

import { DocumentContext } from './component'

export const useDoc = (): Y.Doc => React.useContext(DocumentContext)
