import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Chat, ChatConfig, ChatEntity, ChatUser, Message } from 'model';
import { Const } from 'utils';
import { BaseRepository } from './base.repository';

export class ChatRepository extends BaseRepository {
  public async getRoomIdsByUserId(userId: string): Promise<string[]> {
    const params: DocumentClient.QueryInput = {
      TableName: Const.CHAT_TABLE,
      IndexName: Const.CHAT_TABLE_INDEX_1,
      ProjectionExpression: 'roomId',
      KeyConditionExpression: 'gsipk = :gsipk',
      ExpressionAttributeValues: {
        ':gsipk': `USER#${userId}`,
      },
    };
    const result = await this.docClient.query(params).promise();
    if (!result.Items || result.Items.length == 0) {
      return [];
    }
    return result.Items.map((item) => item.roomId as string);
  }

  public async getChatByRoomId(roomId: string): Promise<Chat | undefined> {
    const id = `ROOM#${roomId}`;
    const params: DocumentClient.QueryInput = {
      TableName: Const.CHAT_TABLE,
      KeyConditionExpression: '#id = :id',
      ExpressionAttributeNames: {
        '#id': 'id',
      },
      ExpressionAttributeValues: {
        ':id': id,
      },
    };
    const result = await this.docClient.query(params).promise();
    if (!result.Items || result.Items.length == 0) {
      return undefined;
    }
    return this.chatEntitiesToChat(result.Items);
  }

  private chatEntitiesToChat(chatEntities: any[]): Chat {
    let chat = {
      id: `ROOM#${chatEntities[0].id}`,
      message: {},
      user: {},
    } as Chat;
    for (const chatEntity of chatEntities) {
      delete chatEntity.id;
      delete chatEntity.prop;
      if (chatEntity.type == 'CONFIG') {
        chat.config = {
          ...chatEntity,
        };
      } else if (chatEntity.type.startsWith('MESSAGE')) {
        chat.message[`MESSAGE#${chatEntity.messageId}`] = {
          ...chatEntity,
        };
      } else if (chatEntity.type.startsWith('USER')) {
        chat.message[`USER#${chatEntity.userId}`] = {
          ...chatEntity,
        };
      }
    }
    return chat;
  }
}
