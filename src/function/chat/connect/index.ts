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
  const connectionId = event.requestContext.connectionId!;
  await chatService.connect(userId, connectionId);
  return 'Connected';
};

export const handler = lambdaHandler(func);
