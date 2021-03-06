import { ApiGatewayManagementApi, DynamoDB, S3 } from 'aws-sdk';
import { Const } from 'utils';

export class BaseService {
  protected docClient: DynamoDB.DocumentClient;
  protected apigwManagementApi: ApiGatewayManagementApi;
  protected s3Client: S3;

  constructor() {
    this.docClient = new DynamoDB.DocumentClient({
      region: Const.REGION,
    });

    this.apigwManagementApi = new ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      region: Const.REGION,
    });

    this.s3Client = new S3({
      region: Const.REGION,
    });
  }
}
