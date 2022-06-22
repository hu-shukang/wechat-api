import { DynamoDB } from 'aws-sdk';
import { Const } from 'utils';

export class BaseRepository {
  protected docClient: DynamoDB.DocumentClient;

  constructor() {
    this.docClient = new DynamoDB.DocumentClient({
      region: Const.REGION,
    });
  }
}
