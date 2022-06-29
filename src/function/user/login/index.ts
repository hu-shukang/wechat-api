import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { userService } from 'service';
import { Func, LoginResponse, TokenPayload } from 'model';
import { lambdaHandler, validatorUtil } from 'utils';
import { schema } from './schema';

const func: Func<LoginResponse> = async (
  event: APIGatewayProxyEvent,
  _tokenPayload: TokenPayload | null,
  _context: Context
): Promise<LoginResponse> => {
  const form = validatorUtil.parse(schema, event.body);
  const resp = await userService.login(form);
  return resp;
};

export const handler = lambdaHandler(func, false);
