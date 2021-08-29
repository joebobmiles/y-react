import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  rootDir: './src',
  transform: {
    '.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>$1'
  },
  testEnvironment: 'jsdom'
}

export default config
