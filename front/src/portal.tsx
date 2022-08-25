import { createPortal } from 'react-dom'

interface ModalPortalProps {
  children: React.ReactNode
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  return createPortal(children, document.getElementById('modal') as HTMLElement)
}

export default ModalPortal
