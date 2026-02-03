import { Public_Sans } from 'next/font/google'

const publicSans = Public_Sans({
  subsets: ['latin'],
  fallback: ['Arial'],
})

export const fonts = {
  publicSans,
}
