export interface UserEntity {
  id: string;
  name: string;
  avator: string;
  friends?: Array<string>;
  connectionId?: string;
}

export interface UserCreateForm {
  name: string;
  avator: string;
}
