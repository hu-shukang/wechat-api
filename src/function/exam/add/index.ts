import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { examService } from 'service';
import { lambdaHandler, validatorUtil } from 'utils';
import { schema } from './schema';

const func = async (event: APIGatewayProxyEvent, _: Context): Promise<any> => {
  const form = await validatorUtil.parse(schema, event.body);
  await examService.addExam(form);
  return `add exam success`;
};

export const handler = lambdaHandler(func);
