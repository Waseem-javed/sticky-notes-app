import { twMerge } from 'tailwind-merge'
import { IFloatingProps } from './types'

const FloatingNoteTitle = (props: IFloatingProps) => {
  const { className, selectedNote, ...rest } = props

  if (!selectedNote) return null

  return (
    <div className={twMerge('flex justify-center items-center', className)} {...rest}>
      <span className="text-gray-400">{selectedNote?.title}</span>
    </div>
  )
}

export default FloatingNoteTitle
