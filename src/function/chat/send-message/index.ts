import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { chatService, userService } from 'service';
import { Func, TokenPayload } from 'model';
import { lambdaHandler, validatorUtil } from 'utils';
import { schema } from './schema';

const func: Func<string> = async (
  event: APIGatewayProxyEvent,
  tokenPayload: TokenPayload | null,
  _context: Context
): Promise<string> => {
  const userId = tokenPayload!.userId;
  const form = validatorUtil.parse(schema, event.body);
  await chatService.sendMessage(userId, form);
  return 'Sent';
};

export const handler = lambdaHandler(func);
