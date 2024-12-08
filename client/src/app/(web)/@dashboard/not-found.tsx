import { NextPage } from 'next'
import { initializeLanguage } from '@inlang/paraglide-next'

import { NotFoundModule } from '@/app/module/not-found'

// component
const NotFound: NextPage = async () => {
  await initializeLanguage()

  // return
  return <NotFoundModule />
}

export default NotFound
