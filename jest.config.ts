import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  rootDir: './src',
  transform: {
    '.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>$1'
  },
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/'
  }
}

export default config
