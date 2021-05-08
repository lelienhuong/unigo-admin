import defaultSettings from '@/settings'

const title = defaultSettings.title || 'beebee.travel - Nền tảng B2B dành cho các dịch vụ ngành du lịch'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
