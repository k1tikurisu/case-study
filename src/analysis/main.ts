import path from 'path'
import { getDiff } from '@/analysis/lib'
import { ProposalResult } from '@/types'
import { readJson, safeWriteFileSync } from '@/utils'

const main = async () => {
  const data = readJson<ProposalResult[]>('datasets/proposal_result.json')

  for (let i = 2000; i < data.length; i++) {
    const { nameWithOwner, prev, updated, isBreaking } = data[i]
    // diffがないものは飛ばす
    if (!isBreaking) continue

    const diff = await getDiff(nameWithOwner, prev.hash, updated.hash)
    safeWriteFileSync(path.join(path.join(process.cwd(), 'outputs'), `${nameWithOwner}-${prev.hash}-${updated.hash}.diff`), diff)
    console.log(`done ${i+1}/${data.length}`)
  }
}

try {
  main()
} catch (e) {
  console.error(e)
}