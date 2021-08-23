import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  rootDir: './src',
  transform: {
    '.tsx?': 'ts-jest'
  },
  testEnvironment: 'jsdom'
}

export default config
