import { NextPage } from 'next'
import { initializeLanguage } from '@inlang/paraglide-next'

import { SignModule } from '@/app/module/sign'

// component
const Page: NextPage = async () => {
  await initializeLanguage()

  // return
  return <SignModule variant={'forgot-password'} />
}

export default Page
