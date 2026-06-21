import { useCallback, useState } from 'react'

const BOOT_KEY = 'portfolio_boot_v2'

export function useBootSession() {
  const [showBoot, setShowBoot] = useState(() => {
    if (typeof window === 'undefined') return true
    try {
      return localStorage.getItem(BOOT_KEY) !== 'true'
    } catch {
      return true
    }
  })

  const completeBoot = useCallback(() => {
    try {
      localStorage.setItem(BOOT_KEY, 'true')
    } catch {
      /* storage blocked — still dismiss overlay */
    }
    setShowBoot(false)
  }, [])

  return { showBoot, completeBoot }
}
