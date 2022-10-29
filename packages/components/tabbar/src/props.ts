import { PropType } from 'vue'
export type TtabList = {
  title: string
  icon: string
}

export type TtabList2 = Exclude<TtabList, 'title'>

const props = {
  tabList: {
    type: Array as PropType<TtabList[]>,
    required: true
  },
  height: {
    type: String,
    default: '46px'
  },
  bgColor: {
    type: String,
    default: '#603b9c'
  },
  activeIndex: {
    type: Number,
    default: 0
  }
}

export const propsFn = (opt: { type: 1 | 2 }): any => {
  if (opt.type === 1) {
    return props
  }

  if (opt.type === 2) {
    const props2 = props
    props2.tabList.type = Array as PropType<TtabList2[]>
    return props2
  }
}
