import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Func, TokenPayload } from 'model';
import { jwtUtil } from './jwt.util';

export const lambdaHandler = <T>(func: Func<T>, withLogin = true): APIGatewayProxyHandler => {
  return async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log('=======start======');
    console.log(JSON.stringify(context));
    console.log(JSON.stringify(event));
    try {
      let tokenPayload: TokenPayload | null = null;
      if (withLogin) {
        const token = event.headers.Authorization;
        tokenPayload = jwtUtil.verityToken(token);
      }
      console.log('tokenPayload', tokenPayload);
      const result = await func(event, tokenPayload, context);
      console.log('=======end======');
      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    } catch (e: any) {
      console.log('=======error======');
      console.log(e.message);
      if (e.constructor.name == 'HttpError') {
        return {
          statusCode: e.getStatusCode(),
          body: JSON.stringify({
            error: e.message,
          }),
        };
      } else if (e.constructor.name == 'ValidateError') {
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: e.getInfoList(),
          }),
        };
      } else if (e.constructor.name == 'TokenExpiredError') {
        return {
          statusCode: 401,
          body: JSON.stringify({
            error: 'トークンの有効期限が切れています',
          }),
        };
      } else if (e.constructor.name == 'JsonWebTokenError') {
        return {
          statusCode: 401,
          body: JSON.stringify({
            error: 'トークンが不正です',
          }),
        };
      } else {
        return {
          statusCode: 500,
          body: JSON.stringify({
            error: 'Interal Server Error',
            detail: e.message,
          }),
        };
      }
    } finally {
      console.log('=======finally======');
    }
  };
};
