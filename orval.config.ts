import { defineConfig } from 'orval'
import { SERVER_ADDR } from './src/consts'

export default defineConfig({
  rupert: {
    input: {
      target: `${SERVER_ADDR}/openapi.json`
    },
    output: {
      client: 'zod',
      mode: 'tags-split',
      target: 'src/types/generated',
      fileExtension: '.zod.ts'
    }
  }
})
