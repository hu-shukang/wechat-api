import { ApiGatewayManagementApi } from 'aws-sdk';
import { UserEntity } from 'model';
import { userRepository } from 'repository';
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

  public async sendMessage(from: string, to: string, data: any) {
    const toUser = await userRepository.getUserById<UserEntity>(to);
    if (toUser && toUser.connectionId) {
      const params: ApiGatewayManagementApi.PostToConnectionRequest = {
        ConnectionId: toUser.connectionId,
        Data: JSON.stringify(data),
      };
      await this.apigwManagementApi.postToConnection(params).promise();
    }
  }
}
