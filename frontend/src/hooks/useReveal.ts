import { useEffect, useRef } from 'react'

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // If user prefers reduced motion, show immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.remove('reveal-init')
      element.classList.add('reveal-visible')
      return
    }

    element.classList.add('reveal-init')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return ref
}
