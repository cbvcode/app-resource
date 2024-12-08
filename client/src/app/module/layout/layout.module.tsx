import { UserElement } from './elements/user'

import { FC, ReactNode } from 'react'

// interface
interface ILayoutModuleProps {
  children: ReactNode
}

// component
const LayoutModule: FC<Readonly<ILayoutModuleProps>> = async (props) => {
  const { children } = props

  // return
  return (
    <div className={'grid h-screen w-full grid-cols-[auto_1fr] gap-3'}>
      <aside>Side bar</aside>

      {children}

      <UserElement />
    </div>
  )
}

export default LayoutModule
