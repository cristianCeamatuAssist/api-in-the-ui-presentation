import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dogsApi } from './dogsApi'
import { DogsPathsEnum, ITableState } from './dogsTypes'
import { createApiQueryFromState } from './dogsUtils'

export const getBreeds = createAsyncThunk('offers/getBreeds', async (query: string, { rejectWithValue }) => {
  try {
    const res = await dogsApi.getBreeds(`${DogsPathsEnum.breeds}${query}`)
    return res
  } catch (error) {
    rejectWithValue('Error')
  }
})

// ...more API thunks

interface IDogsState {
  breedsTable: ITableState
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
    setBreedsTablePage(state, action: PayloadAction<number>) {
      state.breedsTable.page = action.payload
      state.breedsTable.apiQuery = createApiQueryFromState(state.breedsTable)
    },
    setBreedsTableOrdering(state, action: PayloadAction<string>) {
      state.breedsTable.page = 1
      state.breedsTable.ordering = action.payload
      state.breedsTable.apiQuery = createApiQueryFromState(state.breedsTable)
    },
    setBreedTableFilters(state, action: PayloadAction<{ [k: string]: string[] }>) {
      state.breedsTable.filters = action.payload
      state.breedsTable.apiQuery = createApiQueryFromState(state.breedsTable)
    },
    setBreedTableSearchQuery(state, action: PayloadAction<string>) {
      state.breedsTable.searchQuery = action.payload
      state.breedsTable.apiQuery = createApiQueryFromState(state.breedsTable)
    },
    setBreedsTableItemsPerPage(state, action: PayloadAction<number>) {
      state.breedsTable.itemsPerPage = action.payload
      state.breedsTable.apiQuery = createApiQueryFromState(state.breedsTable)
    },
    // ... more and more methods for updates
  },
  extraReducers: (builder) => {
    builder.addCase(getBreeds.fulfilled, (state, action) => {
      state.breedsTable.isLoading = false
      if (action.payload) {
        const { results, totalItems } = action.payload
        state.breedsTable.data = results
        state.breedsTable.totalItems = totalItems
        if (state.breedsTable.page === 0 && totalItems) state.breedsTable.page = 1
      }
    })
    builder.addCase(getBreeds.pending, (state) => {
      state.breedsTable.isLoading = true
      if (state.breedsTable.error) state.breedsTable.error = null
    })
    builder.addCase(getBreeds.rejected, (state, action) => {
      state.breedsTable.isLoading = false
      state.breedsTable.error = action.payload
    })
    // ... more thunks
  },
})

export const {
  setBreedsTablePage,
  setBreedsTableOrdering,
  setBreedTableFilters,
  setBreedTableSearchQuery,
  setBreedsTableItemsPerPage,
} = dogsSlice.actions

export const dogsReducer = dogsSlice.reducer
