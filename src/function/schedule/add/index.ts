import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { Func, TokenPayload } from 'model';
import { scheduleService } from 'service';
import { lambdaHandler, validatorUtil } from 'utils';
import { schema } from './schema';

const func: Func<string> = async (
  event: APIGatewayProxyEvent,
  _tokenPayload: TokenPayload | null,
  _context: Context
): Promise<string> => {
  const form = validatorUtil.parse(schema, event.body);
  await scheduleService.addSchedule(form);
  return 'OK';
};

export const handler = lambdaHandler(func, false);
