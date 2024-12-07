import { CSSProperties } from 'react'
import toast from 'react-hot-toast'

interface IToast {
  (msg: string, type: 'success' | 'error' | 'custom'): void
}

const style: CSSProperties = {
  backgroundColor: 'hsl(var(--nextui-background))',
  fontFamily: 'inherit, sans-serif',
  fontSize: '14px',
  fontWeight: '500',
  color: 'inherit',
  wordWrap: 'break-word',
  lineHeight: '1.1',
}

// toast
const ReactToast = () => {
  const customToast: IToast = (msg, type) => {
    toast[type](msg, {
      position: 'top-center',
      duration: 3000,
      style,
    })
  }

  // return
  return { customToast }
}

export const { customToast } = ReactToast()
