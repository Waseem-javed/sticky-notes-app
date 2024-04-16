import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { INote, NoteState } from '@renderer/types/ReduxTypes/note'

const initialState: NoteState = {
  notes: [
    // {
    //   id: 1,
    //   title: 'Note 1',
    //   content: '#### This is the content of Note 1.',
    //   lastEditTime: '2024-04-03T10:30:00Z'
    // },
    // {
    //   id: 2,
    //   title: 'Note 2',
    //   content: 'Content of Note 2 goes here.',
    //   lastEditTime: '2024-04-02T15:45:00Z'
    // },
    // {
    //   id: 3,
    //   title: 'Note 3',
    //   content: 'Content of Note 3 is placed here.',
    //   lastEditTime: '2024-04-01T09:20:00Z'
    // },
    // {
    //   id: 4,
    //   title: 'Note 4',
    //   content: 'This is the content of Note 4.',
    //   lastEditTime: '2024-03-30T12:00:00Z'
    // },
    // {
    //   id: 5,
    //   title: 'Note 5',
    //   content: 'Content of Note 5 goes here.',
    //   lastEditTime: '2024-03-29T17:10:00Z'
    // }
  ],
  notesLoading: false
}

const noteSlice = createSlice({
  name: 'note',
  initialState: initialState,
  reducers: {
    getNotesSuccess: (state, { payload }: PayloadAction<INote[]>) => {
      state.notes = payload
      state.notesLoading = false
    },
    getNotesFailure: (state) => {
      state.notesLoading = false
    },
    addNoteSuccess: (state, { payload }: PayloadAction<INote>) => {
      const existingNoteIndex = state.notes!.findIndex((note) => note.title === payload.title)
      if (existingNoteIndex !== -1) {
        state.notes![existingNoteIndex] = { ...state?.notes![existingNoteIndex], ...payload }
      } else {
        state.notes?.unshift(payload)
      }
    },
    addNoteFailure: (state) => {
      return state
    },
    updateNoteSuccess: (state, { payload }: PayloadAction<INote>) => {
      state.notes =
        state.notes?.map((e) => {
          return payload.id === e.id ? payload : e
        }) || []
    },
    updateNoteFalure: (state) => {
      return state
    },
    deleteNoteSuccess: (state, { payload }: PayloadAction<string | number>) => {
      state.notes =
        state.notes?.filter((x) => {
          return payload !== x.id
        }) || []
    },
    deleteNoteFailure: (state) => {
      return state
    },
    noteReset: () => {
      return initialState
    }
  }
})

export const {
  getNotesSuccess,
  getNotesFailure,
  deleteNoteSuccess,
  deleteNoteFailure,
  addNoteSuccess,
  addNoteFailure,
  updateNoteSuccess,
  updateNoteFalure,
  noteReset
} = noteSlice.actions

export default noteSlice.reducer

/**
 * Exported selector for usage in components
 *
 * @param {Object<NoteState>} state - The state of noteSlice
 * @param {NoteState} state.note - The state of noteSlice state
 * @returns {NoteState} returns noteSlice state object
 */
export const NoteSelector = (state: { note: NoteState }): NoteState => {
  return state.note
}
