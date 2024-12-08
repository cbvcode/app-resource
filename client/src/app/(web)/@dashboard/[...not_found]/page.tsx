import { NextPage } from 'next'
import { notFound } from 'next/navigation'

// component
const NotFoundCatchAll: NextPage = () => {
  notFound()
}

export default NotFoundCatchAll
