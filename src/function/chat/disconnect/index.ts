import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { chatService } from 'service';
import { Func, TokenPayload } from 'model';
import { lambdaHandler } from 'utils';

const func: Func<string> = async (
  event: APIGatewayProxyEvent,
  tokenPayload: TokenPayload | null,
  _context: Context
): Promise<string> => {
  const userId = tokenPayload!.userId;
  console.log('userId', userId);
  await chatService.disconnect(userId);
  return 'Disconnected';
};

export const handler = lambdaHandler(func, false);
