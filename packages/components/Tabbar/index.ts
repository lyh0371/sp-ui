import { withInstall, SpglobName } from '@sp-ui/utils'

import Tabbar from './src/Tabbar.vue'
Tabbar.name = SpglobName('Tabbar')
export const SpTabbar = withInstall(Tabbar)
export default SpTabbar
