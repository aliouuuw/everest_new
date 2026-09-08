import { createContext, useContext, type AnchorHTMLAttributes, type ReactNode } from 'react'

/** Server-side pathname. Astro islands provide it so SSR matches the client. */
export const LocationContext = createContext<string | null>(null)

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string
  params?: Record<string, string>
  search?: Record<string, string | number | boolean>
  hash?: string
  children?: ReactNode
}

export function Link({ to, params, search, hash, children, href, ...props }: LinkProps) {
  let path = to
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`$${key}`, encodeURIComponent(value))
    }
  }
  if (search && Object.keys(search).length) {
    const qs = new URLSearchParams()
    for (const [key, value] of Object.entries(search)) qs.set(key, String(value))
    path += `?${qs}`
  }
  if (hash) path += `#${hash}`
  return (
    <a href={href ?? path} {...props}>
      {children}
    </a>
  )
}

export function useLocation() {
  const ssrPathname = useContext(LocationContext)
  if (typeof window === 'undefined') {
    return { pathname: ssrPathname ?? '/', search: {}, hash: '' }
  }
  return {
    pathname: window.location.pathname,
    search: Object.fromEntries(new URLSearchParams(window.location.search)),
    hash: window.location.hash,
  }
}

export function useSearch(_opts?: { strict?: boolean }) {
  return {}
}

export function useParams(_opts?: { from?: string }) {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)
  return { slug: segments.at(-1) ?? '' }
}

export function useNavigate() {
  return (opts: { to: string; search?: Record<string, string | number | boolean> }) => {
    let path = opts.to
    if (opts.search && Object.keys(opts.search).length) {
      const qs = new URLSearchParams()
      for (const [key, value] of Object.entries(opts.search)) qs.set(key, String(value))
      path += `?${qs}`
    }
    window.location.href = path
  }
}
