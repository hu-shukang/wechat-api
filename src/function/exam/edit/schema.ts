import { ChoiceModel, ExamAddForm, ExamEditForm } from 'model';
import { Const, JSONSchemaType } from 'utils';

const choiceSchema: JSONSchemaType<ChoiceModel> = {
  type: 'object',
  required: ['tag', 'content'],
  properties: {
    tag: {
      type: 'string',
      pattern: '[A|B|C|D|E|F]',
      errorMessage: '選択肢のタグはA,B,C,D,E,Fの中から選んでください',
    },
    content: {
      type: 'string',
      minLength: 1,
      errorMessage: '内容は文字列ではありません、あるいは中身が空です',
    },
  },
  additionalProperties: false,
  errorMessage: {
    type: '選択肢のJSONフォーマットは正しくない',
    required: {
      tag: '選択肢のタグは必須項目です',
      content: '内容は必須項目です',
    },
    additionalProperties: '要求外のフィールドがありました',
  },
};

const choiceArraySchema: JSONSchemaType<ChoiceModel[]> = {
  type: 'array',
  items: choiceSchema,
  minItems: 2,
  errorMessage: {
    type: '選択肢の形式は正しくない',
    minItems: '2つ以上の選択肢を設定してください',
  },
};

export const schema: JSONSchemaType<ExamEditForm> = {
  type: 'object',
  $async: true,
  required: ['question', 'choiceList', 'answer'],
  properties: {
    question: { type: 'string' },
    analysis: { type: 'string', nullable: true },
    choiceList: choiceArraySchema,
    answer: { type: 'array', items: { type: 'string', pattern: '[A|B|C|D|E|F]' }, minItems: 1, maxItems: 6 },
  },
  additionalProperties: false,
  errorMessage: {
    type: 'JSONフォーマットは正しくない',
    required: {
      question: '問題文は必須項目です',
      answer: '答えは必須項目です',
      choiceList: '選択肢は必須項目です',
    },
    properties: {
      category: 'カテゴリーIDは存在しません',
      question: '問題文は文字列ではありません',
      analysis: '解析は文字列ではありません',
      answer: '答えの形式は正しくない',
    },
    additionalProperties: '要求外のフィールドがありました',
  },
};
