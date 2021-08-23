import React, { useEffect } from 'react'
import { render } from 'react-dom'

import { DocumentProvider, useMap } from '@joebobmiles/y-react'

const App = () => {
  const stateMap = useMap('state')

  useEffect(
    () => {
      stateMap.set('count', 0)
    },
    []
  )

  return (
    <main>
      <p>{stateMap.get('count')}</p>
      <button>+</button>
    </main>
  )
}

render(
  <DocumentProvider>
    <App />
  </DocumentProvider>,
  document.getElementById('app-root')
)
