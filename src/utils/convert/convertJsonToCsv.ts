import json2csv, { Parser, transforms } from 'json2csv'

export const convertJsonToCsv = (json: any, options: json2csv.Options<unknown> = {}) => {
  const parser = new Parser({
    quote: '',
    transforms: [transforms.flatten({ separator: '_'})],
    ...options,
  })
  return parser.parse(json)
}
