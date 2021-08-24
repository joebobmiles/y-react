import React, { useCallback } from 'react'

export const useForceUpdate = (): () => void => {
  const [, dispatch] = React.useState<{}>(Object.create(null))

  return useCallback(
    () => dispatch(Object.create(null)),
    [dispatch]
  )
}
