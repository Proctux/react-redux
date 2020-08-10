import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Map } from 'immutable'

import { usePrevious } from '_hooks/use-previous'

const useOnSuccess = (action, onSuccess) => {
  const isLoading = useSelector(state => !!state.loading.get(action))
  const wasLoading = usePrevious(isLoading)
  const error = useSelector(state => state.error.get(action, Map()))

  useEffect(() => {
    if (!isLoading && wasLoading && !error.size) {
      onSuccess()
    }
  })

  return [isLoading, error]
}

export default useOnSuccess
