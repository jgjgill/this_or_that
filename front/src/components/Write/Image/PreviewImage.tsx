import styles from './previewImage.module.scss'

interface PreviewImageProps {
  imagePath: string
  altText: 'this' | 'that'
}

const PreviewImage = ({ imagePath, altText }: PreviewImageProps) => {
  return <img src={`${process.env.REACT_APP_API_URL}/${imagePath}`} alt={`${altText}_image`} className={styles.image} />
}

export default PreviewImage
