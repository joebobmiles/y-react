import { IndexeddbPersistence } from 'y-indexeddb'
import { WebrtcProvider } from 'y-webrtc'
import { WebsocketProvider } from 'y-websocket'

export type Provider =
  | WebrtcProvider
  | WebsocketProvider
  | IndexeddbPersistence
