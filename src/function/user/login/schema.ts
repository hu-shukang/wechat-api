import { JSONSchemaType, LoginForm, UserCreateForm } from 'model';

export const schema: JSONSchemaType<LoginForm> = {
  type: 'object',
  required: ['name', 'password'],
  properties: {
    name: {
      type: 'string',
      errorMessage: {
        type: 'イメージ拡張子は文字列型です',
      },
    },
    password: {
      type: 'string',
      errorMessage: {
        type: 'イメージ拡張子は文字列型です',
      },
    },
  },
  additionalProperties: false,
  errorMessage: {
    type: 'JSONフォーマットは正しくない',
    required: {
      name: 'ユーザ名は必須です',
      password: 'ユーザ名は必須です',
    },
    additionalProperties: '要求外のフィールドがありました',
  },
};
