import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import ocConfig from './ocConfig'
import ocErrors from './ocErrors'
import ocAuth from './ocAuth'
import ocUser from './ocUser'
import ocProductCache from './ocProductCache'
import ocProductList from './ocProductList'
import ocProductDetail from './ocProductDetail'
import ocCurrentOrder from './ocCurrentOrder'
import ocAddressBook from './ocAddressBook'

// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false
// })

const store = configureStore({
  reducer: {
    ocConfig,
    ocErrors,
    ocAuth,
    ocUser,
    ocAddressBook,
    ocProductCache,
    ocProductList,
    ocProductDetail,
    ocCurrentOrder,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true,
    }),
})

export type OcRootState = ReturnType<typeof store.getState>
export type OcDispatch = typeof store.dispatch
export type OcThunkApi = {
  dispatch: ThunkDispatch<OcRootState, null, AnyAction>
  state: OcRootState
}

export const useOcDispatch = (): ThunkDispatch<OcRootState, null, AnyAction> =>
  useDispatch<OcDispatch>()
export const useOcSelector: TypedUseSelectorHook<OcRootState> = useSelector

export default store
