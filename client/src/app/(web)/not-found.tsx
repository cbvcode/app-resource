import { NextPage } from 'next'
import Link from 'next/link'

// component
const NotFound: NextPage = () => {
  // return
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href='/'>Return Home</Link>
    </div>
  )
}

export default NotFound
