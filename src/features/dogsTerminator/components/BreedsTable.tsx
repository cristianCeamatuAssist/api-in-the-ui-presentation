import { useAppDispatch, useAppSelector } from 'state'
import styled from 'styled-components'
// components
import { Table, TableBodyCell, TableImage } from 'components'
import { updateTableState } from 'features/dogsTerminator/dogsSlice'
import { useDogsBreeds } from '../dogsHooks'
import { IBreedsApiResponse } from '../dogsTypes'

export const BreedsTable = () => {
  // global state
  const { itemsPerPage, page, totalItems, apiQuery } = useAppSelector((state) => state.dogsTerminator.breedsTable)

  // utils
  const dispatch = useAppDispatch()

  // api
  const {
    data: breedsResponse,
    isLoading,
    error,
  } = useDogsBreeds(apiQuery, {
    onSuccess: (breedsResponse: IBreedsApiResponse) => {
      console.log('breedsResponse', breedsResponse)

      const { page, totalItems } = breedsResponse
      dispatch(updateTableState({ table: 'breedsTable', updates: { page: page + 1, totalItems } }))
      //   dispatch(updateTableState({ table: 'breedsTable', prop: 'totalItems', value: totalItems }))
      //   if (!page) dispatch(updateTableState({ table: 'breedsTable', prop: 'page', value: newPage + 1 }))
    },
  })
  console.log('breedsResponse', breedsResponse)
  // handlers
  const changeItemsPerPageHandler = (value: number | string) => {
    dispatch(updateTableState({ table: 'breedsTable', updates: { itemsPerPage: +value, page: 1 } }))
  }

  const changePageHandler = (value: number | string) => {
    dispatch(updateTableState({ table: 'breedsTable', updates: { page: +value } }))
  }

  // variables
  const columns = [
    { prop: 'name', label: 'Name' },
    { prop: 'breed_group', label: 'Breed Group' },
    { prop: 'life_span', label: 'Life Span' },
    { prop: 'origin', label: 'Origin' },
    { prop: 'picture', label: 'Picture' },
  ]

  const rows = breedsResponse?.data.map((breed) => {
    return {
      id: breed.id,
      name: breed.name,
      origin: breed.origin,
      breed_group: breed.breed_group,
      life_span: breed.life_span,
      picture: <TableBodyCell component={<TableImage src={breed.image.url} alt={breed.name} />} />,
    }
  })

  return (
    <Div>
      <Table
        isLoading={isLoading}
        error={error}
        columns={columns}
        rows={rows}
        pagination={{ itemsPerPage, page, totalItems, changePageHandler, changeItemsPerPageHandler }}
      />
    </Div>
  )
}

const Div = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: ${({ theme }) => theme.shadows.light};
  border-radius: ${({ theme }) => theme.borderRadius};
  position: relative;
`
