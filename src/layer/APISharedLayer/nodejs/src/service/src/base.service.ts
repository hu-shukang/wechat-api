import { DynamoDB } from 'aws-sdk';
import { Const } from 'utils';

export class BaseService {
  protected docClient: DynamoDB.DocumentClient;

  constructor() {
    this.docClient = new DynamoDB.DocumentClient({
      region: Const.REGION,
    });
  }
}
