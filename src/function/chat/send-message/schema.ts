import { JSONSchemaType, MessageForm, UserCreateForm } from 'model';

export const schema: JSONSchemaType<MessageForm> = {
  type: 'object',
  required: ['message', 'to'],
  properties: {
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
      to: 'toは必須です',
      message: 'messageは必須です',
    },
    additionalProperties: '要求外のフィールドがありました',
  },
};
