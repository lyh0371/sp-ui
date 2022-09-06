import { ExtractPropTypes } from 'vue'

const SizeType = ['', 'default', 'small', 'large'] as const
const buttonTypes = ['default', 'primary', 'success', 'warning', 'info', 'danger'] as const
export const buttonProps = {
  size: {
    type: String,
    values: SizeType,
    default: 'default'
  },
  type: {
    type: String,
    valuse: buttonTypes,
    default: 'default'
  }
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
