import path from 'path'
import { writeFileSync, mkdirSync, existsSync } from 'fs'

export const safeWriteFileSync = (filepath: string, data: string) => {
  const dir = path.dirname(filepath)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  writeFileSync(filepath, data)
}