export const sleep = async (seconds: number) => {
  const ret = new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, seconds*1000)
  })

  return ret
}