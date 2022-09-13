import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'state'
import styled from 'styled-components'
// components
import { Table, TableBodyCell, TableImage } from 'components'
import { dogsApi } from '../dogsApi'
import { updateTableState } from '../dogsSlice'
import { DogsPathsEnum, IBreed } from '../dogsTypes'

export const BreedsTable = () => {
  // global state
  const { itemsPerPage, page, totalItems, apiQuery } = useAppSelector((state) => state.dogsSmarter.breedsTable)
  // utils
  const dispatch = useAppDispatch()

  // local state
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<IBreed[]>([])

  // effects
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)

        const { data, totalItems, page } = await dogsApi.getBreeds(`${DogsPathsEnum.breeds}${apiQuery}`)

        setData(data)
        dispatch(updateTableState({ table: 'breedsTable', prop: 'totalItems', value: totalItems }))
        dispatch(updateTableState({ table: 'breedsTable', prop: 'page', value: page + 1 }))

        setIsLoading(false)
      } catch (error) {
        console.log('error', error)
        setError('Handle error somehow')
        setIsLoading(false)
      }
    }
    getData()

    // const { data, totalItems, page: newPage } = await handleApiRequestWithStates(() => dogsApi.getBreeds(apiQuery), setIsLoading, setError)
    // setData(data)
  }, [apiQuery, dispatch])

  // handlers
  const changeItemsPerPageHandler = (value: number | string) => {
    dispatch(updateTableState({ table: 'breedsTable', prop: 'itemsPerPage', value }))
  }

  const changePageHandler = (value: number | string) => {
    dispatch(updateTableState({ table: 'breedsTable', prop: 'page', value }))
  }

  // variables
  const columns = [
    { prop: 'name', label: 'Name' },
    { prop: 'breed_group', label: 'Breed Group' },
    { prop: 'life_span', label: 'Life Span' },
    { prop: 'origin', label: 'Origin' },
    { prop: 'picture', label: 'Picture' },
  ]
  const rows = data?.map((breed) => {
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
  height: 100%;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadows.light};
  border-radius: ${({ theme }) => theme.borderRadius};
  position: relative;
`
