import * as Y from 'yjs'
import { useDoc } from '../doc'

export const useSharedType = <T extends Y.AbstractType<any>>(
  name: string,
  constructor: Function | undefined
): T => {
  const doc = useDoc()

  return doc.get(name, constructor) as T
}

export const useMap = <T extends any = any>(name: string): Y.Map<T> =>
  useSharedType<Y.Map<T>>(name, Y.Map)

export const useArray = <T extends any = any>(name: string): Y.Array<T> =>
  useSharedType<Y.Array<T>>(name, Y.Array)

export const useText = (name: string): Y.Text =>
  useSharedType<Y.Text>(name, Y.Text)
