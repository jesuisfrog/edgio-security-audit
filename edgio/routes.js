import { Router } from '@edgio/core'
import { nextRoutes } from '@edgio/next'
import { isProductionBuild } from '@edgio/core/environment'
import { NEXT_CACHE_HANDLER } from './cache'

const router = new Router()

// Serve the old Edgio predefined routes by the latest prefix
router.match('/__xdn__/:path*', ({ redirect }) => {
  redirect('/__edgio__/:path*', 301)
})

// API 
router.match('/l0-api/:path*', ({ proxy }) => { proxy('api', { path: ':path*' })})


// Only compiled with 0 build / 0 deploy
if (isProductionBuild()) {
  router.match('/_next/data/:path*', NEXT_CACHE_HANDLER)

  // Cache but not in 0 dev mode
  router.match('/', NEXT_CACHE_HANDLER)
}

// Fallback in case any request is not served by any routes above will be handled by default routes
router.use(nextRoutes)

export default router
