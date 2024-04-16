import { INote } from '@renderer/types/ReduxTypes/note'

export interface ICreateNoteProps {
  openModal: boolean
  setOpenModal: (value: boolean) => void
  setSelectedNote: (INote) => void
}

export interface PreviewListProps {
  search: string
  setSelectedNote: (INote) => void
  resetScroll: () => void
}

export interface INotePreviewProps extends INote {
  isActive: boolean
  onClick: () => void
}

export type NoteInfo = {
  title: string
  lastEditTime: number
}

export interface IFloatingProps {
  selectedNote: INote | null
  className: string
}

export type NoteContent = string
