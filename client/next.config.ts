import type { NextConfig } from 'next'
import { paraglide } from '@inlang/paraglide-next/plugin'

const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/:path*`,
      },
    ]
  },
}

export default paraglide({
  paraglide: {
    project: './src/core/lib/localization/project.inlang',
    outdir: './src/core/lib/localization/paraglide',
  },
  ...nextConfig,
})
