import { JSONSchemaType, AvatorSingedUrlForm } from 'model';

export const schema: JSONSchemaType<AvatorSingedUrlForm> = {
  type: 'object',
  required: ['extensions'],
  properties: {
    extensions: {
      type: 'string',
      format: '^(jpg|jpeg|png|JPG|JPEG|PNG)$',
      errorMessage: {
        type: 'イメージ拡張子は文字列型です',
        format: 'jpg、jpeg、png以外のイメージはサポートしません',
      },
    },
  },
  additionalProperties: false,
  errorMessage: {
    type: 'JSONフォーマットは正しくない',
    required: {
      extensions: 'イメージ拡張子は必須です',
    },
    additionalProperties: '要求外のフィールドがありました',
  },
};
