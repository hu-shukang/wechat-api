import { UserCreateForm, UserEntity } from 'model';
import { userRepository } from 'repository';
import { Const } from 'utils';
import { BaseService } from './base.service';

export class FileService extends BaseService {
  public getAvatorSignedURL(userId: string, contentType: string): string {
    const path = `/user/${userId}/avator.${contentType}`;
    return this.getSignedURL('putObject', Const.RESOURCE_BUCKRT, path, contentType);
  }

  private getSignedURL(operation: string, bucketName: string, path: string, contentType?: string): string {
    const params = {
      Bucket: bucketName,
      Key: path,
      ContentType: contentType,
    };
    return this.s3Client.getSignedUrl(operation, params);
  }
}
