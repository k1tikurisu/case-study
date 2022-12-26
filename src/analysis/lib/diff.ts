import { dockerRun } from '@/utils'

export const getDiff = async (repoName: string, prevHash: string, updatedHash: string) => {
  const result = await dockerRun(`./getDiff.sh ${repoName} ${prevHash} ${updatedHash}`, 'daaiki/analysis')
  return result
}
