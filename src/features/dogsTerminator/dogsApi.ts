import axios from 'axios'
import { IBreedsApiResponse } from './dogsTypes'
// features

export const httpDogs = axios.create({
  baseURL: process.env.REACT_APP_DOGS_URL || 'https://api.thedogapi.com/',
})

const getBreeds = async (url: string): Promise<IBreedsApiResponse> => {
  const res = await httpDogs.get(url)

  const totalItems = +res.headers['pagination-count']
  const itemsPerPage = +res.headers['pagination-limit']
  const page = +res.headers['pagination-page']

  return { data: res.data, totalItems, page, itemsPerPage }
}

export const dogsApi = {
  getBreeds,
}
