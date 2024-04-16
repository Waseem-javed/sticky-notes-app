import { INote } from './reducer'

export interface NoteState {
  notes: Array<INote> | null
  notesLoading: boolean
}
