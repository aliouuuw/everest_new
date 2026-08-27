//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  {
    // apps/* carry their own configs. The legacy Vite app is linted here until
    // the migration deletes it, so it is deliberately left off the complexity
    // budget in apps/cms/eslint.config.mjs.
    // package.json is skipped: the shared config's pnpm rules need a
    // pnpm-workspace.yaml, and this repo is a bun workspace.
    ignores: ['dist', 'public/sw.js', 'apps', '**/package.json'],
  },
  ...tanstackConfig,
]
