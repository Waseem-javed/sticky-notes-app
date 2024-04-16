import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  addNoteFailure,
  addNoteSuccess,
  deleteNoteFailure,
  deleteNoteSuccess,
  getNotesFailure,
  getNotesSuccess
} from '../reducers/noteReducer'
import { INote } from '@renderer/types/ReduxTypes/note'

export const getNotes = createAsyncThunk('note/getNotes', async (_, { dispatch }) => {
  try {
    dispatch(getNotesSuccess([]))
    return true
  } catch (err) {
    dispatch(getNotesFailure())
    console.log(err)
    return false
  }
})

export const createNote = createAsyncThunk('note/createNote', async (data: INote, { dispatch }) => {
  try {
    dispatch(addNoteSuccess(data))
    return true
  } catch (err) {
    dispatch(addNoteFailure())
    console.log(err)
    return false
  }
})

export const deleteNote = createAsyncThunk(
  'note/deleteNote',
  async (noteId: string | number, { dispatch }) => {
    try {
      dispatch(deleteNoteSuccess(noteId))
      return true
    } catch (err) {
      dispatch(deleteNoteFailure())
      console.log(err)
      return false
    }
  }
)
