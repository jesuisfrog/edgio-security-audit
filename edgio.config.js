// This file was automatically added by edgio init.
// You should commit this file to source control.
// Learn more about this file at https://docs.edg.io/guides/edgio_config
module.exports = {
  connector: '@edgio/next',
  routes: './edgio/routes.js',
  backends: {
    // Define a domain or IP address to proxy as a backend
    // More on: https://docs.edg.io/guides/edgio_config#backends
    api: {
      domainOrIp: 'edgio-wsra.com',
      hostHeader: 'edgio-wsra.com',
      // Disable backend SSL certificate security check, read more on:
      // https://docs.edg.io/guides/edgio_config#:~:text=browser%20is%20used.-,disableCheckCert,-Boolean
      disableCheckCert: true,
    },
  },
}
