import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { userService } from 'service';
import { Func, TokenPayload } from 'model';
import { lambdaHandler, validatorUtil } from 'utils';
import { schema } from './schema';

const func: Func<string> = async (
  event: APIGatewayProxyEvent,
  _tokenPayload: TokenPayload | null,
  _context: Context
): Promise<string> => {
  const form = validatorUtil.parse(schema, event.body);
  const token = await userService.createUser(form);
  return token;
};

export const handler = lambdaHandler(func, false);
