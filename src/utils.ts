import path from 'path'
import json2csv, { Parser, transforms } from 'json2csv'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'

export const readJson = <T>(path: string): T => {
  const content = readFileSync(path, 'utf-8')
  return JSON.parse(content)
}

export const safeWriteFileSync = (filepath: string, data: string) => {
  const dir = path.dirname(filepath)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  writeFileSync(filepath, data)
}

export const convertJsonToCSV = (json: any, options: json2csv.Options<unknown> = {}) => {
  const parser = new Parser({
    quote: '',
    transforms: [transforms.flatten({ separator: '_'})],
    ...options,
  })
  return parser.parse(json)
}
