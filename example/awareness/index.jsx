import React from 'react'
import { render } from 'react-dom'

import {
  DocumentProvider,
  useDoc,
  useMap,
  useWebRtc,
  useAwareness
} from '@joebobmiles/y-react'

const App = () => {
  const doc = useDoc()

  const provider = useWebRtc(doc, 'counter-example-y-react')
  const { states, localID, setLocalState } = useAwareness(provider.awareness)

  const { get, set } = useMap('state')

  React.useEffect(
    () => {
      set('count', 0)

      window.addEventListener('pointermove', (e) => {
        setLocalState((prevState) => ({
          ...prevState,
          x: e.clientX,
          y: e.clientY
        }))
      })
    },
    []
  )

  return (
    <main>
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          padding: 0,
          margin: 0,
          zIndex: 100,
          pointerEvents: 'none'
        }}
      >
        {
          Array.from(states.entries())
            .filter(([id]) => id !== localID)
            .map(
              ([id, state]) => (
                <circle key={id} cx={state.x} cy={state.y} r={5} />
              )
            )
        }
      </svg>
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
