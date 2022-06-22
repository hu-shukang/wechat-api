import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { KeyValue, UserEntity } from 'model';
import { Const } from 'utils';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository {
  public async createUser(userEntity: UserEntity) {
    await this.saveOne(Const.USER_TABLE, userEntity);
  }

  public async updateById(id: string, items: KeyValue) {
    const updateExpression: string[] = [];
    const expressionAttributeNames: KeyValue = {
      '#id': 'id',
    };
    const expressionAttributeValues: KeyValue = {};

    Object.keys(items).forEach((key: string) => {
      const value = items[key];
      expressionAttributeNames[`#${key}`] = key;
      expressionAttributeValues[`:${key}`] = value;
      updateExpression.push(`#${key} = :${key}`);
    });

    const params: DocumentClient.UpdateItemInput = {
      TableName: Const.USER_TABLE,
      Key: {
        id: id,
      },
      ConditionExpression: 'attribute_exists(#id)',
      UpdateExpression: 'set ' + updateExpression.join(', '),
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    };
    await this.docClient.update(params).promise();
  }

  public async deleteProperty(userId: string, propertyName: string): Promise<void> {
    const key = {
      id: userId,
    };
    await this.deletePropertyByKey(Const.USER_TABLE, key, propertyName);
  }

  public async getUserById<T>(userId: string, ...projections: string[]): Promise<T | undefined> {
    const key = {
      id: userId,
    };
    const result = await this.selectOneByKey<T>(Const.USER_TABLE, key, ...projections);
    return result;
  }
}
