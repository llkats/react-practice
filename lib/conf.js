'use strict';

const nconf = require('nconf')

nconf.argv().env().file({ file: 'local.json' })

nconf.defaults({
  port: 4000
})

module.exports = nconf
