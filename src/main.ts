import path from 'path'
import { convertJsonToCSV, readJson, safeWriteFileSync } from './utils'
import type { ProposalResult, TestResult, OutputType, StatusType } from './types'

const main = () => {
  const proposalResult = readJson<ProposalResult[]>('datasets/proposal_result.json')
  const testResult = readJson<TestResult[]>('datasets/test_result.json')

  const outputsData = proposalResult.flatMap((proposalData, index) => {
    const libraryName = proposalData.nameWithOwner
    const prev = { version: proposalData.prev.version, hash: proposalData.prev.hash }
    const updated = { version: proposalData.updated.version, hash: proposalData.updated.hash }
    const isBreaking = proposalData.isBreaking

    const libraryClients = testResult.filter(client => libraryName === client.L__nameWithOwner && (prev.version === client.L__version ||  updated.version === client.L__version))

    const clients = libraryClients.map(client => {
      const name = client.S__nameWithOwner
      const prevData = libraryClients.find(item => name === item.S__nameWithOwner && prev.version === item.L__version)
      const updatedData = libraryClients.find(item => name === item.S__nameWithOwner && updated.version === item.L__version)

      if (prevData && updatedData) {
        const negative = prevData.state === 'success' && updatedData.state === 'failure'
        const positive = prevData.state === 'success' && updatedData.state === 'success'
        let tp = 0, fp = 0, fn = 0, tn = 0, status = false

        if (isBreaking && negative) tp = 1, status = true
        else if (isBreaking && positive) fp = 1, status = true
        else if (!isBreaking && negative) fn = 1, status = true
        else if (!isBreaking && positive) tn = 1, status = true

        if (!status) return

        return {
          name,
          prevCommitHash: prevData.S__commit_id,
          updatedCommitHash: updatedData.S__commit_id,
          tp,
          fp,
          fn,
          tn
        }
      }
      return
    }).filter(e => e)
    
    const uniqClients = Array.from(new Map(clients.map(client => [client?.name, client])).values())

    const outputItem = uniqClients.map(client => ({
      libraryName,
      prev,
      updated,
      client: {
        name: client?.name,
        prevCommitHash: client?.prevCommitHash,
        updatedCommitHash: client?.updatedCommitHash,
        tp: client?.tp,
        tn: client?.tn,
        fp: client?.fp,
        fn: client?.fn,
      }
    }))

    console.log(`Done ${index+1}/${proposalResult.length}`)

    return outputItem
  })

  safeWriteFileSync(
    path.join(path.join(process.cwd(), 'output'), 'output.json'),
    JSON.stringify(outputsData, null, 2)
  )
  safeWriteFileSync(
    path.join(path.join(process.cwd(), 'output'), 'output.csv'),
    convertJsonToCSV(outputsData)
  )
}

try {
  console.log('Runnning...')
  main()
  console.log('Done!')
} catch (err) {
  console.error(err)
}
