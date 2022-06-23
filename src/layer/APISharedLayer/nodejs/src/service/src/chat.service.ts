import { ApiGatewayManagementApi } from 'aws-sdk';
import { Message, MessageForm, UserEntity } from 'model';
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

  public async sendMessage(userId: string, form: MessageForm) {
    console.log(JSON.stringify(form));
    const toUser = await userRepository.getUserById(form.to);
    if (toUser && toUser.connectionId) {
      const params: ApiGatewayManagementApi.PostToConnectionRequest = {
        ConnectionId: toUser.connectionId,
        Data: JSON.stringify(this.getMessageData(userId, form)),
      };
      await this.apigwManagementApi.postToConnection(params).promise();
    } else {
      console.log(`from: [${userId}], to: [${form.to}], not exist`);
    }
  }

  private getMessageData(from: string, form: MessageForm): Message {
    return {
      from: from,
      message: form.message,
      time: dateUtil.current(),
    };
  }
}
