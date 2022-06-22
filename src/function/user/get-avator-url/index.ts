import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { fileService } from 'service';
import { Func, TokenPayload } from 'model';
import { lambdaHandler, validatorUtil } from 'utils';
import { schema } from './schema';

const func: Func<string> = async (
  event: APIGatewayProxyEvent,
  tokenPayload: TokenPayload | null,
  _: Context
): Promise<string> => {
  const userId = tokenPayload!.userId;
  const parameters = JSON.stringify(event.queryStringParameters);
  const form = validatorUtil.parse(schema, parameters);
  const signedUrl = fileService.getAvatorSignedURL(userId, form);
  return signedUrl;
};

export const handler = lambdaHandler(func);
