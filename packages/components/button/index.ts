import { withInstall, SpglobName } from '@sp-ui/utils'

import button from './src/button.vue'
button.name = SpglobName('Button')
export const SpButton = withInstall(button)
export default SpButton
