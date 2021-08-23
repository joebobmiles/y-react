import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
  input: 'src/index.ts',
  plugins: [
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
    'y-websocket',
    'y-webrtc',
    'y-indexeddb',
    'react'
  ]
})
