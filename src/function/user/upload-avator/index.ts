import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { fileService } from 'service';
import { lambdaHandler, validatorUtil } from 'utils';

const func = async (userId: string, event: APIGatewayProxyEvent, _: Context): Promise<any> => {
  return `add exam success`;
};
