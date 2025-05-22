import { AsyncThunk, AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit'
import logout from './ocAuth/logout'
import { logError } from './ocErrors'
import { OcRootState, OcThunkApi } from './ocStore'

function getDescendantProp(obj, desc: string) {
  const arr = desc.split('.')
  let result = obj
  while (arr.length) {
    result = result[arr.shift()]
  }
  return result
}

export interface OcThrottle {
  location: keyof OcRootState
  property: string
}

export function createOcAsyncThunk<Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, OcThunkApi>,
  throttle?: OcThrottle
): AsyncThunk<Returned, ThunkArg, OcThunkApi> {
  return createAsyncThunk<Returned, ThunkArg, OcThunkApi>(
    typePrefix,
    async (args, thunkAPI) => {
      try {
        const result = await payloadCreator(args, thunkAPI)
        return result as Returned
      } catch (err) {
        if (err.isOrderCloudError) {
          switch (err.status) {
            case 401:
              await thunkAPI.dispatch(logout())
              return thunkAPI.rejectWithValue(err)
            default:
              thunkAPI.dispatch(logError(err))
              return thunkAPI.rejectWithValue(err)
          }
        }
        return thunkAPI.rejectWithValue(err)
      }
    },
    {
      condition: (arg, api) => {
        if (throttle) {
          const state = api.getState()[throttle.location]
          const isThrottled = getDescendantProp(state, throttle.property)
          if (typeof isThrottled === 'boolean' && isThrottled) {
            return false
          }
        }
        return true
      },
    }
  )
}
