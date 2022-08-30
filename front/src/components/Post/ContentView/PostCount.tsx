import { CSSProperties } from 'react'
import styles from './postCount.module.scss'

interface PostCountProps {
  thisCount: number
  thatCount: number
  voters: number
  isView: boolean
}

const PostCount = ({ thisCount, thatCount, voters, isView }: PostCountProps) => {
  if (!isView) return null

  return (
    <div className={styles.voteWrapper}>
      <div className={styles.textWrapper}>
        <dl className={styles.countWrapper}>
          <dt>thisCount</dt>
          <dd>{thisCount}</dd>
        </dl>

        <dl className={styles.countWrapper}>
          <dt>thatCount</dt>
          <dd>{thatCount}</dd>
        </dl>
      </div>

      <div
        className={styles.barGraph}
        style={
          { '--this': `${(thisCount / voters) * 100}%`, '--that': `${(thatCount / voters) * 100}%` } as CSSProperties
        }
      />
    </div>
  )
}

export default PostCount
