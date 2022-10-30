type errorType = 'auth/requires-recent-login' | 'invalid value' | 'empty value';

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
    type: 'invalid value',
    msg: 'Вы ввели неверное значение',
  },
  {
    type: 'empty value',
    msg: 'Нет изменений, пустое значение',
  },
];

export const getErrorMsg = (error: any): string | null => {
  const err = allError.find(err => String(error).includes(err.type));

  return err?.msg || null;
};
