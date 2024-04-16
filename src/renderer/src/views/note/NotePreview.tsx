import { cn, formatDate } from '@renderer/utils'
import { ComponentProps, MouseEventHandler } from 'react'
import { INotePreviewProps, NoteInfo } from './types'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
  onClick: MouseEventHandler<HTMLDivElement>
} & ComponentProps<'div'>

const NotePreview = (props: INotePreviewProps) => {
  const { id, title, content, lastEditTime, isActive, ...rest } = props

  return (
    <div
      className={cn(
        'cursor-pointer px-2.5 py-1 my-1 rounded-md transition-colors duration-75 border-l-4 border-[#dfdfdf] hover:text-white hover:bg-zinc-900/90 hover:border-[#000]',
        {
          'hover:text-white text-white border-black bg-zinc-900/90': isActive
        }
      )}
      {...rest}
    >
      <h3 className="mb-1 font-bold truncate">{title}</h3>
      <span className="inline-block w-full mb-2 text-xs font-light text-left">
        {formatDate(lastEditTime)}
      </span>
    </div>
  )
}

export default NotePreview
