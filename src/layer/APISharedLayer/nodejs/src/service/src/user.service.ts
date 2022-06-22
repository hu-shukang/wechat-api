import { HttpError, UserCreateForm, UserEntity } from 'model';
import { userRepository } from 'repository';
import { Const, cryptoUtil } from 'utils';
import { BaseService } from './base.service';

export class UserService extends BaseService {
  public async createUser(form: UserCreateForm) {
    const isExist = await userRepository.existUserName(form.name);
    if (isExist) {
      throw new HttpError(Const.HTTP_STATUS_400, 'このユーザ名既に存在しています。別の名前を指定してください');
    }
    const userEntity: UserEntity = {
      id: cryptoUtil.id(),
      name: form.name,
      password: cryptoUtil.hash(form.password),
    };
    await userRepository.createUser(userEntity);
  }
}
