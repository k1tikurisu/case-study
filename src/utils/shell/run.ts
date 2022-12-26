import childProcess from 'child_process'
import type { ExecOptions } from 'child_process'

export const run = async (command: string, options: ExecOptions = {}): Promise<string> => {
  const ret = new Promise<string>((resolve, reject) => {
    childProcess.exec(`bash -c "${command}" 2>&1`, options, (error, stdout) => {
      if (error) reject(error)
      else resolve(stdout.toString())
    })
  })

  return ret
}
