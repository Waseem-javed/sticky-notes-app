import { twMerge } from 'tailwind-merge'
import { IButtonProps } from './types'

const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
  const { className, children, icon, ...rest } = props
  return (
    <button
      className={twMerge(
        'flex items-center justify-center cursor-pointer size-5 border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100',
        className
      )}
      {...rest}
    >
      {children}
      <span>{icon && icon}</span>
    </button>
  )
}

export default Button
