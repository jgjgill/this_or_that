import dayjs from 'dayjs'

interface CreatedAtTextProps {
  dateTime: Date
}

const CreatedAtText = ({ dateTime }: CreatedAtTextProps) => {
  const postCreatedAt = dayjs(dateTime).format('YYYY-MM-DD')

  return <time dateTime={postCreatedAt}>{postCreatedAt}</time>
}

export default CreatedAtText
