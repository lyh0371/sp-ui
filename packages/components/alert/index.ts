import { withInstall } from '@sp-ui/utils'
import alert from './src/alert'
export const SpAlert = withInstall(alert)
export type SpAlertInstance = InstanceType<typeof SpAlert>

export default SpAlert
