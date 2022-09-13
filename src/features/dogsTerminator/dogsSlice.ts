import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createApiQueryFromState } from 'features/utils'
import { ITableState } from './dogsTypes'

const initialState = {
  breedsTable: {
    totalItems: 0,
    page: 0,
    itemsPerPage: 10,
    apiQuery: '?limit=20',
  },
}

export type DogsStateType = {
  [k in keyof typeof initialState]: Partial<ITableState>
}

type UpdateStateRequestType = {
  table: keyof DogsStateType
  updates: {
    [key in keyof ITableState]?: Partial<ITableState[key]>
  }
}

const dogsSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    updateTableState(state, action: PayloadAction<UpdateStateRequestType>) {
      const { table, updates } = action.payload

      state[table] = { ...state[table], ...updates }
      state[table].apiQuery = createApiQueryFromState(state[table])
    },
  },
})
export const { updateTableState } = dogsSlice.actions

export const dogsReducer = dogsSlice.reducer
