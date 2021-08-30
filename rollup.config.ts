import * as path from 'path'

import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import alias from '@rollup/plugin-alias'

export default defineConfig({
  input: 'src/index.ts',
  plugins: [
    alias({
      entries: [
        { find: /^@(?=\/)/, replacement: path.resolve(__dirname, 'src') }
      ]
    }),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declarationDir: './'
    })
  ],
  output: [
    {
      name: 'ESM',
      file: 'dist/y-react.mjs',
      format: 'es',
      sourcemap: true
    },
    {
      name: 'CommonJS',
      file: 'dist/y-react.cjs',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    }
  ],
  external: [
    'yjs',
    'y-indexeddb',
    'y-protocols',
    'y-webrtc',
    'y-websocket',
    'react'
  ]
})
