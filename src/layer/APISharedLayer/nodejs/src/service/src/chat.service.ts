import { ApiGatewayManagementApi } from 'aws-sdk';
import { ChatModel, UserEntity } from 'model';
import { userRepository } from 'repository';
import { dateUtil } from 'utils';
import { BaseService } from './base.service';

export class ChatService extends BaseService {
  public async connect(userId: string, connectionId: string) {
    const items = {
      connectionId: connectionId,
    };
    await userRepository.updateById(userId, items);
  }

  public async disconnect(userId: string) {
    await userRepository.deleteProperty(userId, 'connectionId');
  }

  public async sendMessage(from: string, to: string, data: string) {
    const toUser = await userRepository.getUserById<UserEntity>(to);
    if (toUser && toUser.connectionId) {
      const params: ApiGatewayManagementApi.PostToConnectionRequest = {
        ConnectionId: toUser.connectionId,
        Data: JSON.stringify(this.getMessageData(from, data)),
      };
      await this.apigwManagementApi.postToConnection(params).promise();
    } else {
      console.log(`from: [${from}], to: [${to}], not exist`);
    }
  }

  private getMessageData(from: string, data: string): ChatModel {
    return {
      from: from,
      message: data,
      time: dateUtil.current(),
    };
  }
}
