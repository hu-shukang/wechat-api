import { UserCreateForm, UserEntity } from 'model';
import { userRepository } from 'repository';
import { cryptoUtil, jwtUtil } from 'utils';
import { BaseService } from './base.service';

export class UserService extends BaseService {
  public async createUser(form: UserCreateForm): Promise<string> {
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
