import { NextPage } from 'next'
import { initializeLanguage } from '@inlang/paraglide-next'

import { DashboardModule } from '@/app/module/dashboard'

// component
const Page: NextPage = async () => {
  await initializeLanguage()

  // return
  return <DashboardModule />
}

export default Page
