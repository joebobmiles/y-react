import React from 'react'
import * as Y from 'yjs'
import { useForceUpdate } from '@/util'
import { useDoc } from '@/feature/doc'

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
      (name, value) =>
        map.set(name, value),
      []
    )
  }
}

export const useArray = <T extends any = any>(name: string): {
  state: T[]
  get: (index: number) => T | undefined
  insert: (index: number, content: T[]) => void
  delete: (index: number, length: number) => void
  push: (content: T[]) => void
  unshift: (content: T[]) => void
  slice: (start: number, end?: number) => void
} => {
  const array = useSharedType<Y.Array<T>>(name, Y.Array)

  const forceUpdate = useForceUpdate()
  React.useEffect(
    () => {
      array.observe(() => forceUpdate())
    },
    []
  )

  return {
    state: array.toJSON(),
    get: React.useCallback(
      (index) => array.get(index),
      []
    ),
    insert: React.useCallback(
      (index, content) =>
        array.insert(index, content),
      []
    ),
    delete: React.useCallback(
      (index, length) =>
        array.delete(index, length),
      []
    ),
    push: React.useCallback(
      (content) =>
        array.push(content),
      []
    ),
    unshift: React.useCallback(
      (content) =>
        array.unshift(content),
      []
    ),
    slice: React.useCallback(
      (start, end) =>
        array.slice(start, end),
      []
    )
  }
}

export const useText = (name: string): Y.Text =>
  useSharedType<Y.Text>(name, Y.Text)
