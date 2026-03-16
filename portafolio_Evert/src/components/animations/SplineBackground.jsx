import { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'

const SCENE_URL = 'https://prod.spline.design/nWFRLKv0xJ9LCEpT/scene.splinecode?v=2026-03-14'

function hideSceneText(root) {
  if (!root?.children) return

  const blockedWords = ['effortless', 'ai', 'integration', 'spline']
  const stack = [...root.children]

  while (stack.length) {
    const node = stack.pop()
    if (!node) continue

    const nodeName = String(node.name || '').toLowerCase()
    if (blockedWords.some((word) => nodeName.includes(word))) {
      node.visible = false
    }

    if (node.children?.length) {
      stack.push(...node.children)
    }
  }
}

export default function SplineBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const forwardPointerMove = (event) => {
      const canvas = containerRef.current?.querySelector('canvas')
      if (!canvas) return
      if (event.target === canvas) return

      // Keep Spline reactive to cursor movement even when UI layers are above it.
      const clonedEvent = new PointerEvent('pointermove', {
        bubbles: true,
        cancelable: true,
        clientX: event.clientX,
        clientY: event.clientY,
        pointerId: event.pointerId,
        pointerType: event.pointerType,
        isPrimary: event.isPrimary,
        pressure: event.pressure,
      })

      canvas.dispatchEvent(clonedEvent)
    }

    window.addEventListener('pointermove', forwardPointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', forwardPointerMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 opacity-30 saturate-70 contrast-90 blur-[0.6px] transition-[opacity,filter] duration-300 dark:opacity-95 dark:saturate-90 dark:contrast-95 dark:brightness-70 dark:blur-[1px]">
        <Spline scene={SCENE_URL} className="h-full w-full" onLoad={hideSceneText} />
      </div>

      {/* Soft overlay keeps text legible above the 3D scene */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-slate-50/95 via-slate-100/88 to-cyan-50/78 dark:from-[#020617]/60 dark:via-[#020617]/72 dark:to-[#020617]/82" />
      <div className="pointer-events-none absolute inset-0 bg-radial-[ellipse_at_top,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.15)_52%,transparent_75%] opacity-90 dark:opacity-0" />
    </div>
  )
}
