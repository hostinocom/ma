import { Montserrat } from 'next/font/google'

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700'], // you can add more like ['400', '500', '700']
  preload  : true,
  display : "swap"
})

