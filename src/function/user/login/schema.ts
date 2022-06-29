import { JSONSchemaType, LoginForm, UserCreateForm } from 'model';

export const schema: JSONSchemaType<LoginForm> = {
  type: 'object',
  required: ['name', 'password'],
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      errorMessage: {
        type: 'ユーザ名は文字列型です',
        minLength: 'ユーザ名は必須です',
      },
    },
    password: {
      type: 'string',
      minLength: 1,
      errorMessage: {
        type: 'パスワードは文字列型です',
        minLength: 'パスワードは必須です',
      },
    },
  },
  additionalProperties: false,
  errorMessage: {
    type: 'JSONフォーマットは正しくない',
    required: {
      name: 'ユーザ名は必須です',
      password: 'パスワードは必須です',
    },
    additionalProperties: '要求外のフィールドがありました',
  },
};
