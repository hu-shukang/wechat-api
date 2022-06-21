export interface UserEntity {
  id: string;
  name: string;
  friends?: Array<string>;
  connectionId?: string;
}
