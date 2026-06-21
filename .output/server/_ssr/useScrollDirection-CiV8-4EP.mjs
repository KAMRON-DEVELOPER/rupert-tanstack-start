import { o as __toESM } from '../_runtime.mjs'
import { k as require_react } from '../_libs/@base-ui/react+[...].mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/useScrollDirection-CiV8-4EP.js
var import_react = /* @__PURE__ */ __toESM(require_react())
var SCROLL_THRESHOLD = 24
var TOP_OFFSET = 16
var useScrollDirection = () => {
  const [dir, setDir] = (0, import_react.useState)('up')
  ;(0, import_react.useEffect)(() => {
    let lastY = window.scrollY
    let ticking = false
    const update = () => {
      const y = window.scrollY
      const diff = y - lastY
      if (y <= TOP_OFFSET) {
        setDir('up')
        lastY = y
        ticking = false
        return
      }
      if (Math.abs(diff) >= SCROLL_THRESHOLD) {
        setDir(diff > 0 ? 'down' : 'up')
        lastY = y
      }
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return dir
}
//#endregion
export { useScrollDirection as t }
