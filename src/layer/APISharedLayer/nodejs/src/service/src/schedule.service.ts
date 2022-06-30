import { BaseService } from './base.service';
import { CloudWatchEvents, Lambda } from 'aws-sdk';
import { cryptoUtil } from 'utils';
import { ScheduleForm } from 'model/src/schedule.model';
import { AddPermissionRequest } from 'aws-sdk/clients/lambda';

export class ScheduleService extends BaseService {
  public async addSchedule(form: ScheduleForm): Promise<string> {
    const id = cryptoUtil.id();
    const ruleName = `RULE_${form.user}_${id}`;
    const targetName = `TARGET_${form.user}_${id}`;
    const params: CloudWatchEvents.PutRuleRequest = {
      Name: ruleName,
      ScheduleExpression: form.rate,
      State: 'ENABLED',
    };
    const putRuleResult = await this.cwevents.putRule(params).promise();
    // putRuleResult.RuleArn
    const targetParams: CloudWatchEvents.PutTargetsRequest = {
      Rule: ruleName,
      Targets: [
        {
          Arn: 'arn:aws:lambda:ap-northeast-1:146114061358:function:WeChatAPI-TestFunction',
          Id: targetName,
          Input: form.input,
        },
      ],
    };
    await this.cwevents.putTargets(targetParams).promise();

    const addPermissionParams: AddPermissionRequest = {
      Action: 'lambda:InvokeFunction',
      FunctionName: 'arn:aws:lambda:ap-northeast-1:146114061358:function:WeChatAPI-TestFunction',
      Principal: 'events.amazonaws.com',
      SourceArn: putRuleResult.RuleArn,
      StatementId: ruleName,
    };
    await this.lambda.addPermission(addPermissionParams).promise();

    return id;
  }

  public async deleteScheduleById(user: string, id: string) {
    const ruleName = `RULE_${user}_${id}`;
    await this.deleteScheduleByRuleName(ruleName);
  }

  public async deleteScheduleByUser(user: string) {
    const params: CloudWatchEvents.ListRulesRequest = {
      NamePrefix: `RULE_${user}_`,
    };
    const result = await this.cwevents.listRules(params).promise();
    if (result.Rules && result.Rules.length > 0) {
      for (const rule of result.Rules) {
        const ruleName = rule.Name;
        if (ruleName) {
          await this.deleteScheduleByRuleName(ruleName);
        }
      }
    }
  }

  private async deleteScheduleByRuleName(ruleName: string) {
    const targetResult = await this.cwevents
      .listTargetsByRule({
        Rule: ruleName,
      })
      .promise();
    const targetIdList = (targetResult.Targets ?? []).map((target) => target.Id);
    const targetParams: CloudWatchEvents.RemoveTargetsRequest = {
      Rule: ruleName,
      Ids: targetIdList,
    };
    await this.cwevents.removeTargets(targetParams).promise();
    const params: CloudWatchEvents.DeleteRuleRequest = {
      Name: ruleName,
    };
    await this.cwevents.deleteRule(params).promise();
    const removePermissionParams: Lambda.RemovePermissionRequest = {
      FunctionName: 'arn:aws:lambda:ap-northeast-1:146114061358:function:WeChatAPI-TestFunction',
      StatementId: ruleName,
    };
    await this.lambda.removePermission(removePermissionParams).promise();
  }
}
