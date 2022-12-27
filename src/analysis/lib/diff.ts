import { run } from '@/utils'

export const getDiff = async (repoName: string, prevHash: string, updatedHash: string) => {
  try {
    const result = await run(`docker run --rm daaiki/analysis ./getDiff.sh ${repoName} ${prevHash} ${updatedHash}`)
    return result
  } catch (e) {
    return JSON.stringify(e).toString()
  }
}
