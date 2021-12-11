global._ = require('lodash')
import filters from './../filters/common'

export default async ({ Vue }) => {
  _.forEach(filters,(fn,fl) => Vue.filter(fl,fn));
}
