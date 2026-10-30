import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import NotFound from './components/NotFound'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 1000 * 60 * 10, // 10 minutes preload cache
    defaultStaleTime: 1000 * 60 * 10, // 10 minutes data cache (avoids re-requesting visited pages)
    defaultGcTime: 1000 * 60 * 60, // 1 hour garbage collection
    defaultNotFoundComponent: NotFound,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
