import { ApiGatewayManagementApi } from 'aws-sdk';
import { Chat, Message, UserEntity } from 'model';
import { chatRepository, userRepository } from 'repository';
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

  public async sendMessage(connectionId: string, form: any) {
    // const toUser = await userRepository.getUserById(form.to);
    // if (toUser && toUser.connectionId) {
    //   const params: ApiGatewayManagementApi.PostToConnectionRequest = {
    //     ConnectionId: toUser.connectionId,
    //     Data: JSON.stringify(this.getMessageData(userId, form)),
    //   };
    //   await this.apigwManagementApi.postToConnection(params).promise();
    // } else {
    //   console.log(`from: [${userId}], to: [${form.to}], not exist`);
    // }
  }

  // private getMessageData(from: string, form: MessageForm): Message {
  //   return {
  //     from: from,
  //     to: '',
  //     message: form.message,
  //     time: dateUtil.current(),
  //   };
  // }

  public async getChatListByUserId(userId: string): Promise<Chat[]> {
    const roomIdList = await chatRepository.getRoomIdsByUserId(userId);
    const promiseList = roomIdList.map((roomId) => chatRepository.getChatByRoomId(roomId));
    const resultAll = await Promise.all(promiseList);
    return resultAll.filter((item) => item != undefined) as Chat[];
  }
}
