export const handleApiRequestWithStates = async <T>(
  fetcher: () => Promise<T>,
  setIsLoading: (param: boolean) => void,
  setError?: (param: any) => void,
): Promise<
  | {
      data: Awaited<T> | null
      error: null
    }
  | {
      data: null
      error: any
    }
> => {
  setError && setError('')
  setIsLoading && setIsLoading(true)
  try {
    const res = await fetcher()
    setIsLoading && setIsLoading(false)

    return { data: res || null, error: null }
  } catch (error: any) {
    setIsLoading && setIsLoading(false)
    setError && setError(error)

    return {
      data: null,
      error,
    }
  }
}
