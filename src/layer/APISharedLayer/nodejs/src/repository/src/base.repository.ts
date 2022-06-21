import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { KeyValue } from 'model';
import { Const } from 'utils';

export class BaseRepository {
  protected docClient: DynamoDB.DocumentClient;

  constructor() {
    this.docClient = new DynamoDB.DocumentClient({
      region: Const.REGION,
    });
  }

  protected async deletePropertyByKey(tableName: string, key: DocumentClient.Key, propertyName: string) {
    const params: DocumentClient.UpdateItemInput = {
      TableName: tableName,
      Key: key,
      UpdateExpression: 'remove #property',
      ExpressionAttributeNames: {
        '#property': propertyName,
      },
    };
    await this.docClient.update(params).promise();
  }

  protected async selectOneByKey<T>(
    tableName: string,
    key: DocumentClient.Key,
    ...projections: string[]
  ): Promise<T | undefined> {
    const projectionExpression: string[] = [];
    const expressionAttributeNames: KeyValue = {};
    projections.forEach((name: string) => {
      projectionExpression.push(`#${name}`);
      expressionAttributeNames[`#${name}`] = name;
    });
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: tableName,
      Key: key,
      ProjectionExpression: projectionExpression.join(', '),
      ExpressionAttributeNames: expressionAttributeNames,
    };
    const result = await this.docClient.get(params).promise();
    if (result.Item) {
      return result.Item as T;
    }
    return undefined;
  }
}
