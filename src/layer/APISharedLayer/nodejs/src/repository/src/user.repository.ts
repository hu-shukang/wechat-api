import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { KeyValue, UserEntity } from 'model';
import { Const } from 'utils';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository {
  public async createUser(userEntity: UserEntity) {
    const params: DocumentClient.PutItemInput = {
      TableName: Const.USER_TABLE,
      Item: userEntity,
    };
    await this.docClient.put(params).promise();
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
    console.log(params);
    await this.docClient.update(params).promise();
  }

  public async deleteProperty(userId: string, propertyName: string): Promise<void> {
    const key = {
      id: userId,
    };
    const params: DocumentClient.UpdateItemInput = {
      TableName: Const.USER_TABLE,
      Key: key,
      UpdateExpression: 'remove #property',
      ExpressionAttributeNames: {
        '#property': propertyName,
      },
    };
    console.log(params);
    await this.docClient.update(params).promise();
  }

  public async getUserById(userId: string): Promise<UserEntity | undefined> {
    const params: DocumentClient.GetItemInput = {
      TableName: Const.USER_TABLE,
      Key: {
        id: userId,
      },
    };
    const result = await this.docClient.get(params).promise();
    if (result.Item) {
      return result.Item as UserEntity;
    }
    return undefined;
  }

  public async existUserName(name: string): Promise<boolean> {
    const params: DocumentClient.QueryInput = {
      TableName: Const.USER_TABLE,
      IndexName: Const.USER_TABLE_NAME_INDEX,
      KeyConditionExpression: '#name = :name',
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':name': name,
      },
    };
    const result = await this.docClient.query(params).promise();
    return result.Count != undefined && result.Count > 0;
  }

  public async existUserNameAndPassword(name: String, password: String): Promise<UserEntity | undefined> {
    const params: DocumentClient.QueryInput = {
      TableName: Const.USER_TABLE,
      IndexName: Const.USER_TABLE_NAME_INDEX,
      KeyConditionExpression: '#name = :name',
      FilterExpression: '#password = :password',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#password': 'password',
      },
      ExpressionAttributeValues: {
        ':name': name,
        ':password': password,
      },
    };
    const result = await this.docClient.query(params).promise();
    if (result.Items && result.Items.length == 1) {
      return result.Items[0] as UserEntity;
    }
    return undefined;
  }
}
