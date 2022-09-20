import { ExtractPropTypes } from 'vue'
import type button from './button.vue'
export const SizeType = ['default', 'small', 'large'] as const

export const buttonTypes = ['default', 'primary', 'success', 'warning', 'info', 'danger', 'text'] as const
import { buildProps } from '@sp-ui/utils/props'
export const buttonProps = buildProps({
  type: {
    type: String,
    values: buttonTypes,
    default: 'default'
  },
  size: {
    type: String,
    values: SizeType,
    default: 'default'
  }
} as const)
export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonType = ButtonProps['type']
export type ButtonInstance = InstanceType<typeof button>
