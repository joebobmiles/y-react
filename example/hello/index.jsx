import React, { useEffect } from 'react'
import { render } from 'react-dom'

import { DocumentProvider, useMap } from '@joebobmiles/y-react'

const App = () => {
  const { get, set } = useMap('state')

  useEffect(
    () => {
      set('count', 0)
    },
    []
  )

  return (
    <main>
      <p>{get('count')}</p>
      <button onClick={() => set('count', get('count') + 1)}>+</button>
    </main>
  )
}

render(
  <DocumentProvider>
    <App />
  </DocumentProvider>,
  document.getElementById('app-root')
)
