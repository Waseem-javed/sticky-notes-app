import { MouseEventHandler, ReactNode } from 'react'

export interface IModalProps {
  title: string
  isOpen: boolean
  onClose: MouseEventHandler<HTMLButtonElement>
  children?: ReactNode
}
