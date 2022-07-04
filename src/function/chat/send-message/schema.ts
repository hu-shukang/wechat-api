import { JSONSchemaType, MessageForm, UserCreateForm } from 'model';

export const schema: JSONSchemaType<MessageForm> = {
  type: 'object',
  required: ['token', 'message', 'to'],
  properties: {
    token: {
      type: 'string',
      errorMessage: {
        type: 'tokenは文字列型です',
      },
    },
    to: {
      type: 'string',
      errorMessage: {
        type: 'toは文字列型です',
      },
    },
    message: {
      type: 'string',
      errorMessage: {
        type: 'messageは文字列型です',
      },
    },
  },
  additionalProperties: false,
  errorMessage: {
    type: 'JSONフォーマットは正しくない',
    required: {
      token: 'tokenは必須です',
      to: 'toは必須です',
      message: 'messageは必須です',
    },
    additionalProperties: '要求外のフィールドがありました',
  },
};
