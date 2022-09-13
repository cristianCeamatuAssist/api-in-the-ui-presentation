import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { set } from 'lodash'
// features
import { IBreed, ITableState } from './dogsTypes'
import { createApiQueryFromState } from './dogsUtils'

// export const getBreeds = createAsyncThunk('offers/getBreeds', async (query: string, { rejectWithValue }) => {
//   try {
//     const res = await dogsApi.getBreeds(`${DogsPathsEnum.breeds}${query}`)
//     return res
//   } catch (error) {
//     rejectWithValue('Error')
//   }
// })

interface IDogsState {
  breedsTable: ITableState & {
    data: IBreed[] | null
  }
}

interface IUpdateTableRequest {
  table: 'breedsTable'
  prop: 'rows' | 'itemsPerPage' | 'totalItems' | 'page' | 'sorting'
  value: string | number | null
}

const initialState = {
  breedsTable: {
    data: null,
    totalItems: 0,
    page: 0,
    ordering: null,
    itemsPerPage: 10,
    apiQuery: '?limit=20',
    filters: null,
    searchQuery: null,
    isLoading: false,
    error: null,
  },
} as IDogsState

const dogsSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    // setBreedsTablePage(state, action: PayloadAction<number>) {
    //   state.breedsTable.page = action.payload
    //   state.breedsTable.apiQuery = createApiQueryFromState(state.breedsTable)
    // },
    // setBreedsTableOrdering(state, action: PayloadAction<string>) {
    //   state.breedsTable.page = 1
    //   state.breedsTable.ordering = action.payload
    //   state.breedsTable.apiQuery = createApiQueryFromState(state.breedsTable)
    // },
    // setBreedTableFilters(state, action: PayloadAction<{ [k: string]: string[] }>) {
    //   state.breedsTable.filters = action.payload
    //   state.breedsTable.apiQuery = createApiQueryFromState(state.breedsTable)
    // },
    // setBreedTableSearchQuery(state, action: PayloadAction<string>) {
    //   state.breedsTable.searchQuery = action.payload
    //   state.breedsTable.apiQuery = createApiQueryFromState(state.breedsTable)
    // },
    // setBreedsTableItemsPerPage(state, action: PayloadAction<number>) {
    //   state.breedsTable.itemsPerPage = action.payload
    //   state.breedsTable.apiQuery = createApiQueryFromState(state.breedsTable)
    // },
    updateBreedsTable(
      state,
      action: PayloadAction<{
        prop: 'rows' | 'itemsPerPage' | 'totalItems' | 'page' | 'sorting'
        value: string | number | null
      }>,
    ) {
      const { prop, value } = action.payload
      set(state.breedsTable, prop, value)

      if (['itemsPerPage'].includes(prop)) state.breedsTable.page = 1
      state.breedsTable.apiQuery = createApiQueryFromState(state.breedsTable)
    },
    updateState(state, action) {
      const { path, value } = action.payload
      set(state, path, value)
    },
    updateTableState(state, action: PayloadAction<IUpdateTableRequest>) {
      const { table, prop, value } = action.payload

      set(state, `${table}.${prop}`, value)

      if (['itemsPerPage'].includes(prop)) state[table].page = 1
      state[table].apiQuery = createApiQueryFromState(state[table])
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getBreeds.fulfilled, (state, action) => {
  //     state.breedsTable.isLoading = false
  //     if (action.payload) {
  //       const { results, totalItems } = action.payload
  //       state.breedsTable.data = results
  //       state.breedsTable.totalItems = totalItems
  //       if (state.breedsTable.page === 0 && totalItems) state.breedsTable.page = 1
  //     }
  //   })
  //   builder.addCase(getBreeds.pending, (state) => {
  //     state.breedsTable.isLoading = true
  //     if (state.breedsTable.error) state.breedsTable.error = null
  //   })
  //   builder.addCase(getBreeds.rejected, (state, action) => {
  //     state.breedsTable.isLoading = false
  //     state.breedsTable.error = action.payload
  //   })
  // },
})

export const { updateState, updateTableState } = dogsSlice.actions

export const dogsReducer = dogsSlice.reducer
