import useSWR from 'swr'
import { dogsApi } from './dogsApi'

import { DogsPathsEnum } from './dogsTypes'

export const useDogsBreeds = (apiQuery: string, options?: any) => {
  const { data, error } = useSWR(`${DogsPathsEnum.breeds}${apiQuery}`, (key) => dogsApi.getBreeds(key), {
    ...(options ? options : {}),
  })

  return { data, error, isLoading: !data && !error }
}
