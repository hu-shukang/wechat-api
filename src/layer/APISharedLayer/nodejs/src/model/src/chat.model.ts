export interface ChatRecord {
  roomId: string; // roomId
  type: string;
}

export interface ChatConfig extends ChatRecord {
  name: string;
  icon: string;
}

export interface Message extends ChatRecord {
  time: number;
  payload: string;
  sender: string; // userId
}

export interface ChatUser extends ChatRecord {
  userId: string;
  joinedAt: number;
  gsipk: string; // USER#userId
  gsisk: string; // ROOM#roomId
}

export type ChatEntity = {
  id: string;
  prop: string;
  type: string;
} & { [key: string]: ChatRecord };

export interface Chat {
  /**
   * ROOM#roomId
   */
  id: string;
  /**
   * Config
   */
  config: ChatConfig;
  /**
   * key: MESSAGE#time
   * value: Message
   */
  message: { [key: string]: Message };
  /**
   * key: USER#userId
   * value: User
   */
  user: { [key: string]: ChatUser };
}
