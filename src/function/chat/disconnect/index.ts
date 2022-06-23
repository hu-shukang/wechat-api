import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { chatService, userService } from 'service';
import { Func, TokenPayload } from 'model';
import { lambdaHandler, validatorUtil } from 'utils';

const func: Func<string> = async (
  event: APIGatewayProxyEvent,
  tokenPayload: TokenPayload | null,
  _context: Context
): Promise<string> => {
  const userId = tokenPayload!.userId;
  await chatService.disconnect(userId);
  return 'Disconnected';
};

export const handler = lambdaHandler(func);
