'use client'

// interface
import { NextPage } from 'next'

// interface
interface IGlobalError {
  error: Error & { digest?: string }
  reset: () => void
}

const GlobalError: NextPage<Readonly<IGlobalError>> = (props) => {
  const { reset } = props

  // return
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}

export default GlobalError
