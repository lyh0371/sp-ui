import { onMounted, ref, Ref, CSSProperties } from 'vue'

interface IuseScoll {
  showScroll: Ref<boolean>
  getScrollStyle: (e: HTMLElement, index: number, isInit?: boolean) => CSSProperties
}

export function useScoll(tabScrollDom: Ref<HTMLElement | null>, tabsDom: Ref<HTMLElement | null>): IuseScoll {
  const showScroll = ref<boolean>(false)
  let oldIndx: number = 0
  let moveX: number = 0
  let oldClientRect = {} as HTMLElement
  const scrollStyle = ref<CSSProperties>({
    transform: `translateX(0px)`
  })
  const getScrollStyle = (e: HTMLElement, index: number, isInit?: boolean): CSSProperties => {
    if (!showScroll.value) return scrollStyle.value
    const selfX = e.getBoundingClientRect().x - (e.parentNode as HTMLElement).getBoundingClientRect().x
    const pw: number = (e.parentNode as HTMLElement)?.offsetWidth
    const ppw: number = (e.parentNode?.parentNode as HTMLElement)?.offsetWidth
    // 初始化
    const surePw = pw - ppw

    // 如果初始化的时候元素不在可视区域，需要让元素滚动到可视区域
    if (isInit && selfX > ppw) {
      moveX = selfX - ppw / 2
      console.log(moveX, surePw)
    }
    if (!isInit && index != oldIndx) {
      const { x: oldx } = oldClientRect?.getBoundingClientRect()
      const { x } = e.getBoundingClientRect()
      if (index > oldIndx) {
        // 左移动
        moveX = moveX + (x - oldx)
        moveX = moveX > surePw ? surePw : moveX
      } else {
        moveX = moveX - (oldx - x)
        moveX = moveX < 0 ? 0 : moveX
      }
    }
    scrollStyle.value = {
      transform: `translateX(${-moveX}px)`
    }
    oldClientRect = e
    oldIndx = index
    return scrollStyle.value
  }

  onMounted(() => {
    showScroll.value = tabScrollDom.value!.offsetWidth - tabsDom.value!.offsetWidth >= 0
  })

  return {
    showScroll,
    getScrollStyle
  }
}
