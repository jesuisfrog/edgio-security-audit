const { withEdgio, withServiceWorker } = require('@edgio/next/config')

const _preEdgioExport = {
    output: 'standalone',
    async rewrites() {
        return [
            {
                source: '/commerce/:name',
                destination: '/commerce',
            },
        ]
    },
}

module.exports = (phase, config) =>
    withEdgio()