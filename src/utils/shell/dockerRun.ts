import { run } from '@/utils'

export const dockerRun = async (command: string, tag: `${string}/${string}`) => {
  return run(`docker run --rm ${tag} ${command}`)
}
