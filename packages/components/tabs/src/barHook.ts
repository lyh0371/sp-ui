import { ref, CSSProperties, Ref } from 'vue'

interface IuseBarStyle {
  updataBarStyle: (e: MouseEvent) => Promise<void>
  barStyle: Ref<CSSProperties>
}
export function useBarStyle(): IuseBarStyle {
  const barStyle = ref<CSSProperties>({
    transform: `translateX(0px)`,
    width: `20px`
  })

  async function updataBarStyle(e: MouseEvent) {
    const ckDom = e.target as HTMLElement
    const pDom = ckDom.parentNode as HTMLElement
    const { width, x } = ckDom.getBoundingClientRect()
    const pDomX = pDom.getBoundingClientRect().x
    barStyle.value.width = width + 'px'
    barStyle.value.transform = `translateX(${x - pDomX}px)`
  }

  return {
    updataBarStyle,
    barStyle
  }
}
