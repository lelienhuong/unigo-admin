import Vue from 'vue'

Vue.filter('captitalize', (val) => {
  return val.charAt(0).toUpperCase() + val.slice(1)
})

Vue.filter('formatCurrency', (val) => {
  val = val + ''
  return val.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
})

Vue.filter('formatDate', (val, locale = 'en') => {
  const moment = require('moment')
  moment.locale(locale)
  return moment(val).format('Do MMMM YYYY')
})

Vue.filter('formatDateTime', (val) => {
  const moment = require('moment')
  return val ? moment(val).format('HH:mm DD-MM-YYYY') : ''
})

Vue.filter('formatTime', (val) => {
  const moment = require('moment')
  return val ? moment(val).format('hh:mm') : ''
})

Vue.filter('slugify', (val) => {
  // For more information, visit https://www.npmjs.com/package/slug
  const slug = require('slug')
  return slug(val)
})
