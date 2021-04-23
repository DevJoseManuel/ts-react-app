import React from 'react'

export default function useIsMounted(): () => boolean {
  const ref = React.useRef(false)

  React.useEffect(() => {
    ref.current = true
    return () => {
      ref.current = false
    }
  }, [])

  return React.useCallback(() => ref.current, [ref])
}
