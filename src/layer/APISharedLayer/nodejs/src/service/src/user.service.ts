import { HttpError, UserCreateForm, UserEntity } from 'model';
import { userRepository } from 'repository';
import { Const, cryptoUtil, jwtUtil } from 'utils';
import { BaseService } from './base.service';

export class UserService extends BaseService {
  public async createUser(form: UserCreateForm): Promise<string> {
    const isExist = await userRepository.existUserName(form.name);
    if (isExist) {
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
}
