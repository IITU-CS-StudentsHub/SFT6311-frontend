import { useState } from 'react'
import styles from './Counter.module.css'

export const Counter = () => {
  const [count, setCount] = useState(0)

  const increment = () => setCount(count + 1)

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button className={styles.button} onClick={increment}>
        +
      </button>
      <button className={styles.button} onClick={decrement}>
        -
      </button>
    </div>
  )
}
