import { HttpError, LoginForm, LoginResponse, UserCreateForm, UserEntity } from 'model';
import { userRepository } from 'repository';
import { Const, cryptoUtil, jwtUtil } from 'utils';
import { BaseService } from './base.service';

export class UserService extends BaseService {
  public async createUser(form: UserCreateForm): Promise<string> {
    const user = await userRepository.getUserByName(form.name);
    if (user) {
      throw new HttpError(Const.HTTP_STATUS_400, 'このユーザ名既に存在しています。別の名前を指定してください');
    }
    const id = cryptoUtil.id();
    const userEntity: UserEntity = {
      id: id,
      name: form.name,
      password: cryptoUtil.hash(form.password),
    };
    await userRepository.createUser(userEntity);
    const token = jwtUtil.createToken(id);
    return token;
  }

  public async login(form: LoginForm): Promise<LoginResponse> {
    const password = cryptoUtil.hash(form.password);
    const user = await userRepository.getUserByName(form.name);
    if (user == undefined || password !== user.password) {
      throw new HttpError(Const.HTTP_STATUS_401, 'ユーザ名やパスワード不正です');
    }
    const token = jwtUtil.createToken(user.id);
    const resp: LoginResponse = {
      token: token,
      avator: user.avator,
    };
    return resp;
  }
}
