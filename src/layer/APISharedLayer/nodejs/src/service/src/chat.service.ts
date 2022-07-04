import { ApiGatewayManagementApi } from 'aws-sdk';
import { Chat, MessageForm, MessageVO, TokenPayload } from 'model';
import { chatRepository, userRepository } from 'repository';
import { dateUtil, jwtUtil } from 'utils';
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

  public async sendMessage(connectionId: string, form: MessageForm) {
    let tokenPayload: TokenPayload = jwtUtil.verityToken(form.token);
    const toUser = await userRepository.getUserById(form.to);
    if (toUser && toUser.connectionId) {
      const params: ApiGatewayManagementApi.PostToConnectionRequest = {
        ConnectionId: toUser.connectionId,
        Data: JSON.stringify(this.getMessageData(tokenPayload.userId, toUser.id, form.message)),
      };
      await this.apigwManagementApi.postToConnection(params).promise();
    } else {
      console.log(`from: [${tokenPayload.userId}], to: [${form.to}], not exist`);
    }
  }

  private getMessageData(from: string, to: string, message: string): MessageVO {
    return {
      from: from,
      to: to,
      message: message,
      time: dateUtil.current(),
    };
  }

  public async getChatListByUserId(userId: string): Promise<Chat[]> {
    const roomIdList = await chatRepository.getRoomIdsByUserId(userId);
    const promiseList = roomIdList.map((roomId) => chatRepository.getChatByRoomId(roomId));
    const resultAll = await Promise.all(promiseList);
    return resultAll.filter((item) => item != undefined) as Chat[];
  }
}
