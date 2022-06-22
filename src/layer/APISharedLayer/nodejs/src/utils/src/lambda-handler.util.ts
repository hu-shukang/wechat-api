import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';

export type Func = (event: APIGatewayProxyEvent, context: Context) => Promise<any>;

export const lambdaHandler = (func: Func): APIGatewayProxyHandler => {
  return async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    try {
      const result = await func(event, context);
      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    } catch (e: any) {
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
      } else {
        return {
          statusCode: 500,
          body: JSON.stringify({
            error: 'Interal Server Error',
            detail: e.message,
          }),
        };
      }
    }
  };
};
