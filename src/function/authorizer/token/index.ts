import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayTokenAuthorizerEvent): Promise<any> => {
  const authorizationToken = event.authorizationToken;
  const token = process.env.TOKEN;
  let effect = 'Deny';
  if (token === authorizationToken) {
    effect = 'Allow';
  }
  const result = {
    principalId: '*',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: event.methodArn,
        },
      ],
    },
    context: {
      userId: 'hushukang',
    },
  };
  console.log(effect);
  console.log(event.methodArn);
  return result;
};
