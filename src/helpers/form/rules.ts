import { ValidationRule } from 'react-hook-form'

import { Regex, emailRegExp } from './regex'

export const required: string | ValidationRule<boolean> = 'Обязательное поле!'

export namespace Rules {
  export const User = {
    Email: {
      required,
      pattern: {
        value: emailRegExp,
        message: 'Пожалуйста, введите корректный адрес электронной почты!',
      },
    },

    Password: {
      required,
      minLength: {
        value: 8,
        message: 'Минимум 8 символов (например: awb834_)!',
      },
    },

    Username: {
      required,
      maxLength: {
        value: 30,
        message: 'Максимум 30 символов!',
      },
      minLength: {
        value: 3,
        message: 'Минимум 3 символа!',
      },
    },

    Description: {
      required,
      maxLength: {
        value: 300,
        message: 'Максимум 300 символов',
      },
      minLength: {
        value: 2,
        message: 'Минимум 2 символа!',
      },
    },

    Phone: {
      required,
      pattern: {
        value: Regex.phoneNumExp,
        message: 'Пожалуйста, введите корректный номер телефона!',
      },
    },

    SocialLink: {
      pattern: {
        value: Regex.socialLinksExp,
        message: 'Пожалуйста, введите корректную ссылку (https://)!',
      },
    },
  }

  export const Post = {
    Review: {
      required,
      minLength: {
        value: 10,
        message: 'Минимум 10 символов!',
      },
    },
    
    Description: {
      required,
      maxLength: {
        value: 800,
        message: 'Ошибка. Текст больше 800 символов.',
      },
      minLength: {
        value: 10,
        message: 'Минимум 10 символа!',
      },
    },

    Name: {
      required,
      maxLength: {
        value: 80,
        message: 'Ошибка. Текст больше 80 символов.',
      },
      minLength: {
        value: 3,
        message: 'Минимум 3 символа!',
      },
    },

    Price: {
      required: 'Если хотите поставить цену "Договорная", пишите "0"',
      maxLength: {
        value: 10,
        message: 'Ошибка. Цена не может быть больше 10 символов.',
      },
    },
  }

  export const Complaint = {
    Questions: {
      required,
      maxLength: {
        value: 300,
        message: 'Максимум 300 символов',
      },
      minLength: {
        value: 2,
        message: 'Минимум 2 символа!',
      },
    },
  }

  export const Paymant = {
    Number: {
      required,
      maxLength: {
        value: 19,
        message: 'Максимум 19 символов',
      },
      minLength: {
        value: 13,
        message: 'Минимум 13 символа!',
      },
    },
    Name: {
      required,
      maxLength: {
        value: 20,
        message: 'Максимум 20 символов',
      },
      minLength: {
        value: 2,
        message: 'Минимум 2 символа!',
      },
    },
    Date: {
      required,
      maxLength: {
        value: 2,
        message: 'Максимум 2 символов',
      },
      minLength: {
        value: 2,
        message: 'Минимум 2 символа!',
      },
    },
    Cvv: {
      required,
      maxLength: {
        value: 3,
        message: 'Максимум 3 символов',
      },
      minLength: {
        value: 3,
        message: 'Минимум 3 символа!',
      },
    },
  }
}
