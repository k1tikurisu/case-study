import { readFileSync } from 'fs'

export const readJson = <T>(path: string): T => {
  const content = readFileSync(path, 'utf-8')
  return JSON.parse(content)
}