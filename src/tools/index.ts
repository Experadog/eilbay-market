import Cookies from 'js-cookie'

export const dateConverter = (ReviewDate: string | Date) => {
  if(!ReviewDate) {
    return ''
  }

  const date = new Date(ReviewDate)
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  return date.toDateString() === currentDate.toDateString() ? `сегодня, ${formatTime(date)}` :
    date.toDateString() === new Date(currentDate.getTime() - 86400000).toDateString() ? `вчера, ${formatTime(date)}` :
      `${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}, ${formatTime(date)}`
}

const formatTime = (date: Date): string => {
  return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`
}

export const priceConverter = (currentCurrency: string, exchangeRate: any, price: string) => {
  if (!exchangeRate?.results || !currentCurrency) return `${price} ${currentCurrency}`
  
  const newPrice = exchangeRate.results[currentCurrency] * Number(price)

  if (isNaN(newPrice)) return `${price} ${currentCurrency}`

  return `${newPrice.toFixed(2)} ${currentCurrency}`
}

export const setJWTToCookies = (jwt: { access: string, refresh: string }) => {
  const { access, refresh } = jwt

  if (access && refresh) {
    Cookies.set('accessToken', access, { expires: 1 })
    Cookies.set('refreshToken', refresh, { expires: 7 })
  }
}

export function getReviewWordForm(reviewCount: number) {
  const words = [' отзыв', ' отзыва', ' отзывов']
  const cases = [2, 0, 1, 1, 1, 2]
  return reviewCount + words[(reviewCount % 100 > 4 && reviewCount % 100 < 20) ? 2 : cases[(reviewCount % 10 < 5) ? reviewCount % 10 : 5]]
}
