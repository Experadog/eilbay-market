import React from 'react'

import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

export const Stars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  const stars = []
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} />)
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half-star" />)
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-star-${i}`} />)
  }

  return <div className="flex items-center space-x-1 text-[#FFA800] tablet:text-xl text-lg">{stars}</div>
}

