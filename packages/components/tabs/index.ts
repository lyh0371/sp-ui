import { withInstall, SpglobName } from '@sp-ui/utils'

import tabs from './src/tabs.vue'
tabs.name = SpglobName('Tabs')
export const SpTabs = withInstall(tabs)
export default SpTabs
