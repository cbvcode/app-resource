import { NextPage } from 'next'
import { initializeLanguage } from '@inlang/paraglide-next'

// component
const Page: NextPage = async () => {
  await initializeLanguage()

  // return
  return <main>Dashboard</main>
}

export default Page
