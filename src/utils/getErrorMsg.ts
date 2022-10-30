type errorType =
  | 'auth/requires-recent-login'
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'invalid value'
  | 'empty value'
  | 'auth/email-already-in-use'
  | 'auth/weak-password'
  | 'auth/invalid-email'
  | 'success login';

interface IError {
  type: errorType;
  msg: string;
}

const allError: IError[] = [
  {
    type: 'auth/requires-recent-login',
    msg: 'Данная операция требует повторной авторизации. Перезайдите в аккаунт',
  },
  {
    type: 'auth/user-not-found',
    msg: 'Такого пользователя не существует',
  },
  {
    type: 'auth/wrong-password',
    msg: 'Неверный пароль',
  },
  {
    type: 'invalid value',
    msg: 'Вы ввели неверное значение',
  },
  {
    type: 'empty value',
    msg: 'Нет изменений, пустое значение',
  },
  {
    type: 'auth/email-already-in-use',
    msg: 'Такой email уже используется',
  },
  {
    type: 'auth/weak-password',
    msg: 'Слабый пароль, требуется минимум 6 символов',
  },
  {
    type: 'auth/invalid-email',
    msg: 'Невалидный email',
  },
];

export const getErrorMsg = (error: any): string | null => {
  const err = allError.find(err => String(error).includes(err.type));

  return err?.msg || null;
};
