import { AvatorSingedUrlForm, UserCreateForm, UserEntity } from 'model';
import { userRepository } from 'repository';
import { Const } from 'utils';
import { BaseService } from './base.service';

export class FileService extends BaseService {
  public getAvatorSignedURL(userId: string, form: AvatorSingedUrlForm): string {
    const extensions = form.extensions;
    const path = `/user/${userId}/avator.${extensions}`;
    return this.getSignedURL('putObject', Const.RESOURCE_BUCKRT, path, extensions);
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
