import { getDiff } from '@/analysis/lib'
import data from '../../datasets/proposal_result.json'

const main = async () => {
  const diff = await getDiff('MikeMcl/big.js', '86268e96b3dbf6db8ce319489f410277d9d4ea1b', 'c6fadd083a296b6af7d1b4ffcc28d64b1e67ea58')
  console.log(diff)
}

try {
  main()
} catch (e) {
  console.error(e)
}