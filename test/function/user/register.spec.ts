import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { handler } from '../../../src/function/user/register/index';

const context = null as unknown as Context;
const callback = null as unknown as Callback;

describe('user', () => {
  describe('register', () => {
    it('add user', async () => {
      const event: any = {
        body: JSON.stringify({
          name: 'hushukang',
          password: '123',
          passwordConfirm: '123',
        }),
      };
      const result = await handler(event, context, callback);
      console.log(result);
    });
  });
});
