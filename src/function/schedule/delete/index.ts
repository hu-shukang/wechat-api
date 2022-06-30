import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { Func, TokenPayload } from 'model';
import { scheduleService } from 'service';
import { lambdaHandler } from 'utils';

const func: Func<string> = async (
  event: APIGatewayProxyEvent,
  _tokenPayload: TokenPayload | null,
  _context: Context
): Promise<string> => {
  if (!event.queryStringParameters) {
    return 'FAIL';
  }
  const id = event.queryStringParameters.id;
  const user = event.queryStringParameters.user;
  if (id && user) {
    await scheduleService.deleteScheduleById(user, id);
    return 'OK';
  } else if (user) {
    await scheduleService.deleteScheduleByUser(user);
    return 'OK';
  }
  return 'FAIL';
};

export const handler = lambdaHandler(func, false);
