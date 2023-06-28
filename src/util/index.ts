import React, { useCallback } from 'react'

/**
 * A React Hook that generates a callback that can be used to force React to
 * update without changing any application state.
 *
 * @returns A callback that forces a React update.
 */
export const useForceUpdate = (): () => void => {
  // eslint-disable-next-line space-infix-ops
  const [, dispatch] = React.useState<{}>(Object.create(null))

  return useCallback(
    () => dispatch(Object.create(null)),
    [dispatch]
  )
}
