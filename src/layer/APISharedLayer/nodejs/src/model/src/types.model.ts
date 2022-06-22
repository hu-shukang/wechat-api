import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { TokenPayload } from './token.model';

export type KeyValue = { [key: string]: any };

export type Func<T> = (event: APIGatewayProxyEvent, tokenPayload: TokenPayload | null, context: Context) => Promise<T>;
