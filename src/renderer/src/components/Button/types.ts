import { ComponentProps, ReactNode } from 'react'

export interface IButtonProps extends ComponentProps<'div'> {
  className: string
  icon?: ReactNode
  children?: ReactNode
}
