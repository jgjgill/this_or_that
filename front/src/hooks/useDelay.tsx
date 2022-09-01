import { useState } from 'react'

const useDelay = (time: number) => {
  const [delay, setDelay] = useState(false)

  setTimeout(() => {
    setDelay((prev) => !prev)
  }, time)

  return delay
}

export default useDelay
