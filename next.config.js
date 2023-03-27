const { withEdgio, withServiceWorker } = require('@edgio/next/config')

const _preEdgioExport = {
    output: 'standalone',
}

module.exports = (phase, config) =>
    withEdgio()