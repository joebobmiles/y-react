import React from 'react'
import * as Y from 'yjs'
import { useForceUpdate } from '../../util'
import { useDoc } from '../doc'

const useSharedType = <T extends Y.AbstractType<any>>(
  name: string,
  constructor: Function | undefined
): T => {
  const doc = useDoc()
  return doc.get(name, constructor) as T
}

export const useMap = <T extends any = any>(name: string): {
  state: { [x: string]: T }
  get: (name: string) => T | undefined
  set: (name: string, value: T) => void
} => {
  const map = useSharedType<Y.Map<T>>(name, Y.Map)

  const forceUpdate = useForceUpdate()
  React.useEffect(
    () => {
      map.observe(() => forceUpdate())
    },
    []
  )

  return {
    state: map.toJSON(),
    get: React.useCallback(
      (name: string) => map.get(name),
      []
    ),
    set: React.useCallback(
      (name, value) => {
        map.set(name, value)
        forceUpdate()
      },
      []
    )
  }
}

export const useArray = <T extends any = any>(name: string): Y.Array<T> =>
  useSharedType<Y.Array<T>>(name, Y.Array)

export const useText = (name: string): Y.Text =>
  useSharedType<Y.Text>(name, Y.Text)
