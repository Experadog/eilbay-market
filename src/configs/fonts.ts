import { Inter, Marmelad, Urbanist } from 'next/font/google'

const inter = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['cyrillic', 'latin'],
  variable: '--font-inter',
})

const marmelad = Marmelad({
  weight: '400',
  subsets: ['cyrillic', 'latin'],
  variable: '--font-marmelad',
})

const urbanist = Urbanist({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-urbanist',
})

export {
  inter,
  marmelad,
  urbanist,
}
