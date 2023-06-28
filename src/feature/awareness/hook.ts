import React from 'react'
import { Awareness } from 'y-protocols/awareness'
import { useForceUpdate } from '@/util'

export const useAwareness = <T extends {} = { [x: string]: any }>(
  awareness: Awareness
): {
    states: Map<number, T>
    localID: number
    localState: T
    setLocalState: React.Dispatch<React.SetStateAction<T>>
  } => {
  const forceUpdate = useForceUpdate()
  React.useEffect(
    () => {
      const forceUpdateOnAwarenessChange = (): void => forceUpdate()

      awareness.on('change', forceUpdateOnAwarenessChange)

      return () => awareness.off('change', forceUpdateOnAwarenessChange)
    },
    []
  )

  const [localState, setLocalState] = React.useState<T>({} as unknown as T)

  return ({
    states: React.useMemo(
      () => awareness.getStates() as Map<number, T>,
      [awareness]
    ),
    localID: awareness.clientID,
    localState,
    setLocalState: React.useCallback(
      (nextState) => {
        awareness.setLocalState(
          typeof nextState === 'function'
            /* @ts-expect-error */
            ? nextState(awareness.getLocalState() as T)
            : nextState
        )

        setLocalState(nextState)
      },
      [awareness]
    )
  })
}
