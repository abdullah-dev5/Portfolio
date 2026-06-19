import { useCallback, useState } from 'react'

const BOOT_KEY = 'bootComplete'

export function useBootSession() {
  const [showBoot, setShowBoot] = useState(() => {
    if (typeof window === 'undefined') return true
    return sessionStorage.getItem(BOOT_KEY) !== 'true'
  })

  const completeBoot = useCallback(() => {
    sessionStorage.setItem(BOOT_KEY, 'true')
    setShowBoot(false)
  }, [])

  return { showBoot, completeBoot }
}
