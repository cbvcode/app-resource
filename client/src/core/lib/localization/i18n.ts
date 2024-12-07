import { Middleware, Navigation, PrefixStrategy } from '@inlang/paraglide-next'

import * as t from './paraglide/messages.js'
import { type AvailableLanguageTag, languageTag } from './paraglide/runtime'

const strategy = PrefixStrategy<AvailableLanguageTag>({
  prefixDefault: 'never',
  exclude: (pathname) => pathname == '/api' || pathname.startsWith('/api/'),
})

export const middleware = Middleware({ strategy })
export const { Link, useRouter, usePathname, redirect, permanentRedirect } = Navigation({ strategy })
export { AvailableLanguageTag, languageTag, strategy, t }
