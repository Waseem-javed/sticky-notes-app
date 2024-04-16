import { combineReducers } from '@reduxjs/toolkit'

import noteReducer, { NoteSelector } from './noteReducer'

const appReducer = combineReducers({
  note: noteReducer
})

export { NoteSelector }

export type RootState = ReturnType<typeof appReducer>

/**
 * Resets state on logout if needed
 *
 * @param {RootState} state - current action state dispatched from actions
 * @param {any} action - current action dispatched
 * @returns {Reducer<CombinedState>} returns combined state
 */
export const rootReducer = (state: RootState, action: any) => {
  if (action.type === 'RESET') {
    return appReducer({} as RootState, action)
  }
  return appReducer(state, action)
}

export default appReducer
