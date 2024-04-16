import { useDispatch } from 'react-redux'
import { ThunkAction } from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { configureStore, Action, Reducer } from '@reduxjs/toolkit'
// Reducers
import appReducer, { rootReducer } from './reducers'

// persisted Reducer

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer as Reducer)

export type RootState = ReturnType<typeof appReducer>

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false })
  },
  devTools: true
})

export type AppDispatch = typeof store.dispatch
/**
 * App dispatch as a replacement for default useDispatch hook
 *
 * @returns {AppDispatch} returns app dispatch instance for store.dispatch
 */
export const useAppDispatch = () => {
  return useDispatch<AppDispatch>()
}

export const persistor = persistStore(store)
