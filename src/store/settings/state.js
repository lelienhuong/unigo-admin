import defaultSettings from '@/settings'
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

export const state = () => ({
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
})
