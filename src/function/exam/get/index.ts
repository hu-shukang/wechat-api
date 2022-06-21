import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { examService } from 'service';
import { lambdaHandler } from 'utils';
import { HttpError } from 'model';

const func = async (event: APIGatewayProxyEvent, _: Context): Promise<any> => {
  if (!event.pathParameters || !event.pathParameters.id) {
    throw new HttpError(400, 'no exam set id');
  }
  const id = event.pathParameters.id;
  const examList = await examService.getAllExamByExamSetId(id);
  return examList;
};

export const handler = lambdaHandler(func);
