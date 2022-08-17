import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    msg: String
  },
  setup(props) {
    return () => <div> 你好 我是div {props.msg} </div>
  }
})
