//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  {
    ignores: ['dist', 'public/sw.js'],
  },
  ...tanstackConfig,
]
