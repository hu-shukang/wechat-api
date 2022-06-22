import { UserCreateForm, UserEntity } from 'model';
import { userRepository } from 'repository';
import { BaseService } from './base.service';

export class UserService extends BaseService {
  public async createUser(form: UserCreateForm) {
    const userEntity: UserEntity = {
      ...form,
      id: 'xxx',
    };
    await userRepository.createUser(userEntity);
  }
}
