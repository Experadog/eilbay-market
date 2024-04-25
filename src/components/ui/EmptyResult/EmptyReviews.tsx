import React from 'react'

interface Props {
  reviewsCount: number
  accessToken: string | undefined
}

const EmptyReviews = ({ reviewsCount, accessToken }: Props) => {
  if (!accessToken) return (
    <div className="flex flex-col items-center py-10 text-center">
      <p className="font-bold">
        Авторизуйтесь чтобы оставить отзыв
      </p>
      <p>
        Поделитесь мнением о покупке и помогите другим покупателям сделать выбор
      </p>
    </div>
  )

  return (reviewsCount === 0 && accessToken) && (
    <div className="flex flex-col items-center py-10 text-center">
      <p className="font-bold">
        Отзывов пока нет — ваш может стать первым
      </p>
      <p>
        Поделитесь мнением о покупке и помогите другим покупателям сделать выбор
      </p>
    </div>
  )
}

export default EmptyReviews
