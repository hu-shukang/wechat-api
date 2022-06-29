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

export interface LoginResponse {
  token: string;
}
