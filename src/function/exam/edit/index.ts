import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { examService } from 'service';
import { HttpError } from 'model';
import { lambdaHandler, validatorUtil } from 'utils';
import { schema } from './schema';

const func = async (event: APIGatewayProxyEvent, _: Context): Promise<any> => {
  if (!event.pathParameters || !event.pathParameters.id) {
    throw new HttpError(400, 'no exam id');
  }
  const id = event.pathParameters.id;
  const form = await validatorUtil.parse(schema, event.body);
  await examService.editExam(id, form);
  return `edit exam success`;
};

export const handler = lambdaHandler(func);
