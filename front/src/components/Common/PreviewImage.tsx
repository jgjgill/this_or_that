import styles from './previewImage.module.scss'

interface PreviewImageProps {
  imagePath: string
  altText: string
}

const PreviewImage = ({ imagePath, altText }: PreviewImageProps) => {
  return (
    <div className={styles.imageBox}>
      <img src={`${process.env.REACT_APP_API_URL}/${imagePath}`} alt={`${altText}_image`} className={styles.image} />
    </div>
  )
}

export default PreviewImage
