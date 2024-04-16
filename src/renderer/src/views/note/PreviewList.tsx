import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NoteSelector } from '@renderer/redux/reducers'
import { getNotes } from '@renderer/redux/actions/noteActions'
import { useAppDispatch } from '@renderer/redux/store'
import NotePreview from './NotePreview'
import Skeleton from '@renderer/components/Skeleton'
import { PreviewListProps } from './types'

const PreviewList: React.FC<PreviewListProps> = (props: PreviewListProps) => {
  const { search, setSelectedNote, resetScroll } = props
  const dispatch = useAppDispatch()
  const INoteState = useSelector(NoteSelector)
  const { notes, notesLoading } = INoteState

  const [selectedNoteId, setSelectedNoteId] = useState<string | number>()

  useEffect(() => {
    if (!notes && notesLoading) dispatch(getNotes())
    if (!selectedNoteId && notes) {
      setSelectedNoteId(notes[0]?.id)
      setSelectedNote(notes[0])
    }
  }, [notes, notesLoading])

  // Filter notes based on search value
  const filteredNotes = notes?.filter((note) =>
    note.title?.toLowerCase().includes(search?.toLowerCase())
  )

  return (
    <ul className="py-1" {...props}>
      {notes?.length === 0 ? (
        <span className="text-gray flex h-[70vh] justify-center items-center">No Data</span>
      ) : notesLoading ? (
        <Skeleton />
      ) : (
        (search ? filteredNotes : notes)?.map((note) => {
          return (
            <NotePreview
              key={note.title + note.lastEditTime}
              {...note}
              isActive={selectedNoteId === note.id}
              onClick={() => {
                setSelectedNote(note)
                setSelectedNoteId(note.id)
                resetScroll()
              }}
            />
          )
        })
      )}
    </ul>
  )
}

export default PreviewList
