export type Revision = {
  version: string
  hash: string
}

export type ProposalInput = {
  nameWithOwner: string
  npm_pkg: string
  state: string
  stats: {
    failure: number
    success: number
  }
  updated: Revision
  prev: Revision
}

export type ProposalResult = ProposalInput & {
  prev: Revision & {
    tests: number
    coverage: any
  }
  updated: Revision & {
    tests: number
    coverage: any
  }
  testCases: {
    change: number
    insert: number
    delete: number
    unchanged: number
  }
  otherCodes: {
    change: number
    delete: number
    unchanged: number
  }
  isBreaking: boolean
}

export type TestResult = {
  L__nameWithOwner: string
  L__npm_pkg: string
  L__commit_version: string
  S__nameWithOwner: string
  S__npm_pkg: string
  S__commit_id: string
  L__version: string
  L__hash: string
  state: 'failure' | 'success'
}

export type StatusType = 'tp' | 'fn' | 'fp' | 'tn'

export type OutputType = {
  libraryName: string
  prev: Revision
  updated: Revision
  clients: [
    {
      name: string
      prevCommitHash: string
      updatedCommitHash: string
      status: StatusType
    }
  ]
}