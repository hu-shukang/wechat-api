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
  console.log(event.body);
  const connectionId = event.requestContext.connectionId;
  const form = validatorUtil.parse(schema, event.body);
  await chatService.sendMessage(connectionId!, form);
  return 'Sent';
};

export const handler = lambdaHandler(func, false);
