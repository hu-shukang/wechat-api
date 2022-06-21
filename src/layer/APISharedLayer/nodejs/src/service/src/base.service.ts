import { ApiGatewayManagementApi, DynamoDB } from 'aws-sdk';
import { Const } from 'utils';

export class BaseService {
  protected docClient: DynamoDB.DocumentClient;
  protected apigwManagementApi: ApiGatewayManagementApi;

  constructor() {
    this.docClient = new DynamoDB.DocumentClient({
      region: Const.REGION,
    });

    this.apigwManagementApi = new ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
    });
  }
}
