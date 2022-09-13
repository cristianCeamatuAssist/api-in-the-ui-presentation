import { configureStore } from '@reduxjs/toolkit'
import { authReducer as auth } from 'features/auth'
import { counterReducer as counter } from 'features/counter'
import { dogsReducer as dogs } from 'features/dogsInitial/dogsSlice'
import { dogsReducer as dogsSmarter } from 'features/dogsSmarter/dogsSlice'
import { dogsReducer as dogsTerminator } from 'features/dogsTerminator/dogsSlice'

export const store = configureStore({
  reducer: {
    counter,
    auth,
    dogs,
    dogsTerminator,
    dogsSmarter,
  },
})
