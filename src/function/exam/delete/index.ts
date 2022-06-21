import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { examService } from 'service';
import { HttpError } from 'model';
import { lambdaHandler } from 'utils';

const func = async (event: APIGatewayProxyEvent, _: Context): Promise<any> => {
  if (!event.pathParameters || !event.pathParameters.id) {
    throw new HttpError(400, 'no exam id');
  }
  const id = event.pathParameters.id;
  await examService.deleteExam(id);
  return `delete success`;
};

export const handler = lambdaHandler(func);
