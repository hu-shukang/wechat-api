import { Message } from './chat.model';

export interface UserEntity {
  id: string;
  name: string;
  password: string;
  avator?: string;
  friends?: Array<string>;
  connectionId?: string;
}

export interface UserCreateForm {
  name: string;
  password: string;
  passwordConfirm: string;
}

export interface AvatorSingedUrlForm {
  extensions: string;
}

export interface LoginForm {
  name: string;
  password: string;
}

export interface FriendVO {
  id: string;
  name: string;
  avator?: string;
  message: Message[];
}

export interface LoginResponse {
  token: string;
  avator?: string;
}
